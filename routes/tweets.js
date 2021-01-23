const express = require("express"),
    router = express.Router({
        mergeParams: true,
    });

const {
    createTweet,
    deleteTweet,
    likeTweet,
    unlikeTweet,
} = require("../handlers/tweets");
const { uploadImage } = require("../middlewares/uploads");

const { getTweet } = require("../handlers/getTweet");

router.route("/").post(uploadImage, createTweet);

router.route("/:tweet_id").get(getTweet).delete(deleteTweet);

router.route("/:tweet_id/l").post(likeTweet);

router.route("/:tweet_id/ul").post(unlikeTweet);

module.exports = router;
