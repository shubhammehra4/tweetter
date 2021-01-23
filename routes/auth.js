const express = require("express"),
    router = express.Router();

const { signup, signin } = require("../handlers/auth");

const { uploadImage } = require("../middlewares/uploads");

router.post("/signup", uploadImage, signup);

router.post("/signin", signin);

module.exports = router;
