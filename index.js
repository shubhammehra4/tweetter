require("dotenv").config();
const express = require("express"),
    cors = require("cors"),
    helmet = require("helmet"),
    bodyParser = require("body-parser"),
    fileUpload = require("express-fileupload"),
    compression = require("compression"),
    morgan = require("morgan"),
    db = require("./models");
const app = express();

const errorHandler = require("./handlers/error");
const {
    loginRequired,
    ensureCorrectUser,
} = require("./middlewares/authorization");

const authRoutes = require("./routes/auth"),
    tweetRoutes = require("./routes/tweets"),
    userRoutes = require("./routes/user");

app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(compression());
app.use(
    fileUpload({
        useTempFiles: true,
        uploadTimeout: 10,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/user/:id/tweet", loginRequired, ensureCorrectUser, tweetRoutes);
app.use("/api/user/:id", loginRequired, ensureCorrectUser, userRoutes);

//TODO: Configure cors to set up access only by the client
//TODO: Apply a rate-limiter or delay to create account and reset password
//TODO: Sanitize inputs

app.get("/api/tweets", loginRequired, async function (req, res, next) {
    try {
        const skip = parseInt(req.query.skip);
        const limit = 15;
        const startIdx = skip ? skip : 0;
        const endIdx = startIdx + limit;
        let results = {};

        results.hasMore = false;
        if (endIdx < (await db.Tweet.countDocuments().exec())) {
            results.hasMore = true;
        }
        results.results = await db.Tweet.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIdx)
            .populate("user", {
                username: true,
                profileImageThumb: true,
                name: true,
            })
            .select("text image user createdAt likesNumber")
            .lean();

        return res.status(200).json(results);
    } catch (err) {
        return next(err);
    }
});

//*Errors
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use(errorHandler);

app.listen(process.env.PORT, function () {
    console.log(
        `Running on ${process.env.PORT} in ${process.env.NODE_ENV} ENV`
    );
});
// {
//     origin: [process.env.CLIENT_URL],
//     methods: ["GET", "POST", "HEAD", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }
