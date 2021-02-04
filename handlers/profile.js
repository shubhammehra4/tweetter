const db = require("../models");

//* Change response and send updated token
exports.editProfile = async function (req, res, next) {
    try {
        let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {
            ...req.body,
        }).select("name profileImageThumb");

        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async function (req, res, next) {
    try {
        let user = await db.User.findById(req.params.id);
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            user.password = req.body.newpassword;
            await user.save();
            return res.status(200).json({
                message: "done",
            });
        } else {
            return res.status(401).json({
                message: "invalid",
            });
        }
    } catch (err) {
        return next({
            status: 401,
            message: err.message,
        });
    }
};

exports.getUserProfile = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id)
            .populate("tweets", {
                text: true,
                image: true,
                likesNumber: true,
                createdAt: true,
            })
            .lean();
        let { profileImage, tweets, following, followers } = foundUser;
        return res.status(200).json({
            profileImage,
            tweets,
            following: following.length,
            followers: followers.length,
        });
    } catch (err) {
        next(err);
    }
};

//TODO: Test and configure
exports.getUserLikes = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id)
            .populate([
                {
                    path: "likedTweets",
                    populate: {
                        path: "user",
                        select: "name username profileImageThumb",
                    },
                    select: "likesNumber text user createdAt",
                },
            ])
            .select("likedTweets")
            .lean();

        return res.status(200).json(foundUser);
    } catch (err) {
        next(err);
    }
};

exports.getUserFollowing = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id)
            .populate("following", {
                name: true,
                username: true,
                profileImageThumb: true,
            })
            .populate("followers", {
                name: true,
                username: true,
                profileImageThumb: true,
            })
            .select("following followers")
            .lean();

        res.status(200).json(foundUser);
    } catch (err) {
        next(err);
    }
};
