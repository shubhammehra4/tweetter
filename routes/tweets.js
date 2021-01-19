const express = require("express"),
    router = express.Router({
        mergeParams: true,
    });

const {
    createTweet,
    getTweet,
    deleteTweet,
    likeTweet,
    unlikeTweet,
} = require("../handlers/tweets");

router.route("/").post(createTweet);

router.route("/:tweet_id").get(getTweet).delete(deleteTweet);

router.route("/:tweet_id/l").post(likeTweet);

router.route("/:tweet_id/ul").post(unlikeTweet);

module.exports = router;
