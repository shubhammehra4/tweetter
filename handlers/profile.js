const db = require("../models");

//* Change response and send updated token
exports.editProfile = async function (req, res, next) {
    try {
        let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {
            ...req.body,
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
