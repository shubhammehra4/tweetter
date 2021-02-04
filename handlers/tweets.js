const db = require("../models");

exports.createTweet = async function (req, res, next) {
    try {
        let tweet = await db.Tweet.create({
            text: req.body.text,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.tweets.push(tweet.id);
        await foundUser.save();

        let foundTweet = await db.Tweet.findById(tweet._id)
            .populate("user", {
                username: true,
                profileImageThumb: true,
                name: true,
            })
            .select("text user createdAt likesNumber")
            .lean();

        return res.status(201).json(foundTweet);
    } catch (err) {
        next(err);
    }
};

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
            .populate("comments", {
                text: true,
                user: true,
            })
            .lean();

        return res.status(200).json(foundTweet);
    } catch (err) {
        return next(err);
    }
};

exports.deleteTweet = async function (req, res, next) {
    try {
        let foundTweet = await db.Tweet.findById(req.params.tweet_id);
        await foundTweet.remove();

        return res.status(200).json(foundTweet.id);
    } catch (err) {
        return next(err);
    }
};

exports.likeTweet = async function (req, res, next) {
    try {
        let foundTweet = await db.Tweet.findById(req.params.tweet_id);
        let foundUser = await db.User.findById(req.params.id);

        let hasUpdated = foundTweet.likes.addToSet(foundUser.id);
        if (hasUpdated.length) {
            await foundUser.likedTweets.addToSet(foundTweet.id);
            await foundUser.save();

            foundTweet.likesNumber = foundTweet.likesNumber + 1;
            await foundTweet.save();

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

exports.unlikeTweet = async function (req, res, next) {
    try {
        let foundTweet = await db.Tweet.findById(req.params.tweet_id);
        let foundUser = await db.User.findById(req.params.id);

        let unchanged = foundTweet.likes.length;
        await foundTweet.likes.pull(foundUser.id);
        let changed = foundTweet.likes.length;

        if (changed < unchanged) {
            await foundUser.likedTweets.pull(foundTweet.id);
            await foundUser.save();

            foundTweet.likesNumber = foundTweet.likesNumber - 1;
            await foundTweet.save();

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

exports.addComment = async function (req, res, next) {
    try {
        let foundTweet = await db.Tweet.findById(req.params.tweet_id);
        await foundTweet.comments.push({
            text: req.body.comment,
            user: req.params.id,
        });
        await foundTweet.save();

        return res.status(201).json({
            message: "done",
        });
    } catch (err) {
        next(err);
    }
};
