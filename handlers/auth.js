const db = require("../models"),
    jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
    try {
        let user = await db.User.findOne({ email: req.body.email });
        let { id, username, name, email, profileImageThumb } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    username,
                    email,
                    name,
                    profileImageThumb,
                },
                process.env.SECRET_KEY
            );

            return res.status(200).json({
                id,
                username,
                email,
                name,
                profileImageThumb,
                token,
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Password.",
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email/Username",
        });
    }
};

exports.signup = async function (req, res, next) {
    try {
        let user = await db.User.create({ ...req.body });
        let { id, username, name, email, profileImageThumb } = user;
        let token = jwt.sign(
            {
                id,
                username,
                email,
                name,
                profileImageThumb,
            },
            process.env.SECRET_KEY
        );

        return res.status(201).json({
            id,
            username,
            email,
            name,
            profileImageThumb,
            token,
        });
    } catch (err) {
        if (err.code === 11000) {
            err.keyPattern.email ? (err.message = "email") : (err.message = "username");
        }
        return next({
            status: 400,
            message: err.message,
        });
    }
};

// exports.checkUnique = async function (req, res, next) {
//     try {
//         let user = await db.User.find({ email: req.body.email });

//         if (user) {
//             return res.status(400).json({ message: "email" });
//         } else {
//             let user2 = await db.User.find({ username: req.body.username });
//             if (user2) {
//                 return res.status(400).json({ message: "username" });
//             } else {
//                 return res.status.json({ message: "unique" });
//             }
//         }
//     } catch (err) {
//         return next(err);
//     }
// };
