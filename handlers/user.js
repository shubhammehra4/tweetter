const db = require("../models");

exports.followUser = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id);
        let userToFollow = await db.User.findById(req.params.fid);

        let hasUpdated = foundUser.following.addToSet(userToFollow.id);
        if (hasUpdated.length) {
            userToFollow.followers.addToSet(foundUser.id);
            await userToFollow.save();
            await foundUser.save();

            return res.status(200).json({
                message: "done",
            });
        } else {
            return res.status(400).json({
                message: "invalid",
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.unfollowUser = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id);
        let userToUnfollow = await db.User.findById(req.params.fid);

        let unchanged = foundUser.following.length;
        await foundUser.following.pull(userToUnfollow.id);
        let changed = foundUser.following.length;

        if (changed < unchanged) {
            userToUnfollow.followers.pull(foundUser.id);
            await userToUnfollow.save();
            await foundUser.save();

            return res.status(200).json({
                message: "done",
            });
        } else {
            return res.status(400).json({
                message: "invalid",
            });
        }
    } catch (err) {
        next(err);
    }
};
