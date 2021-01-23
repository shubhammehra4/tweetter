const express = require("express"),
    router = express.Router({
        mergeParams: true,
    });

const { followUser, unfollowUser } = require("../handlers/user");
const {
    getUser,
    getUserLikes,
    getUserFollowing,
} = require("../handlers/getUser");

const { editProfile, resetPassword } = require("../handlers/profile");
const { uploadImage } = require("../middlewares/uploads");

router.route("/profile").get(getUser);

router.route("/profile/edit").post(uploadImage, editProfile);

router.route("/profile/reset-password").post(resetPassword);

router.route("/likes").get(getUserLikes);

router.route("/following").get(getUserFollowing);

router.route("/follow/:fid").post(followUser);

router.route("/unfollow/:fid").post(unfollowUser);

module.exports = router;
