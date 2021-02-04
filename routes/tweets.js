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
    addComment,
} = require("../handlers/tweets");
const { uploadImage } = require("../middlewares/uploads");

router.route("/").post(uploadImage, createTweet);

router.route("/:tweet_id").get(getTweet).delete(deleteTweet);

router.route("/:tweet_id/l").post(likeTweet);

router.route("/:tweet_id/ul").post(unlikeTweet);

router.route("/:tweet_id/c").post(addComment);

module.exports = router;
