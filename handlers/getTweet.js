const db = require("../models");

exports.getTweet = async function (req, res, next) {
    try {
        let foundTweet = await db.Tweet.findById(req.params.tweet_id)
            .populate("user", {
                username: true,
                profileImageThumb: true,
                name: true,
            })
            .populate("likes", {
                username: true,
            })
            .lean();

        return res.status(200).json(foundTweet);
    } catch (err) {
        return next(err);
    }
};
