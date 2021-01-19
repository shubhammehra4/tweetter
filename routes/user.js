const express = require("express"),
    router = express.Router({
        mergeParams: true,
    });

const {
    getUser,
    getUserLikes,
    getUserFollowing,
    followUser,
    unfollowUser,
} = require("../handlers/user");
const { profileSetup, resetPassword } = require("../handlers/profile");

router.route("/profile").get(getUser);

router.route("/profile/edit").post(profileSetup);

router.route("/profile/reset-password").post(resetPassword);

router.route("/likes").get(getUserLikes);

router.route("/following").get(getUserFollowing);

router.route("/follow/:fid").post(followUser);

router.route("/unfollow/:fid").post(unfollowUser);

module.exports = router;
