const db = require("../models");

exports.getUser = async function (req, res, next) {
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
    } catch (err) {}
};
