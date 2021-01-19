const db = require("../models"),
    cloudinary = require("cloudinary").v2,
    fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//* Change response and send updated token
exports.profileSetup = async function (req, res, next) {
    try {
        let uploadedImages = {};
        if (req.files) {
            const data = req.files.file.tempFilePath;
            const uploadFile = await cloudinary.uploader.upload(data);

            console.info(uploadFile);
            uploadedImages.profileImageID = uploadFile.public_id;
            uploadedImages.profileImage = uploadFile.secure_url;
            uploadedImages.profileImageThumb = uploadFile.secure_url;

            fs.unlink(data, () => {
                console.info("done removing!!!");
            });
        }

        //TODO: upload image to cloud from here
        let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {
            ...req.body,
            ...uploadedImages,
        }).select("name profileImageThumb");

        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async function (req, res, next) {
    try {
        let user = await db.User.findById(req.params.id);
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            user.password = req.body.newpassword;
            await user.save();
            return res.status(200).json({
                message: "changed",
            });
        } else {
            return res.status(401).json({
                message: "Password is invalid",
            });
        }
    } catch (err) {
        return next({
            status: 401,
            message: err.message,
        });
    }
};
