const cloudinary = require("cloudinary").v2,
    fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async function (req, res, next) {
    try {
        if (req.files) {
            const data = req.files.file.tempFilePath;
            const uploadFile = await cloudinary.uploader.upload(data);

            console.log("file uploaded");
            console.log(uploadFile);
            res.locals.uploads = uploadFile;

            fs.unlink(data, () => {
                console.info("done removing!!!");
            });
        }
        return next();
    } catch (err) {
        return next({
            status: 400,
            message: "Sorry, something went wrong. PLease try again",
        });
    }
};
