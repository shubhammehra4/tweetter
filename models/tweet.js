const mongoose = require("mongoose"),
    User = require("./user");

const tweetSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160,
        },
        images: [],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        likesNumber: {
            type: Number,
            default: 0,
            min: 0,
        },
        comments: [
            {
                text: String,
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                createdAt: new Date(),
            },
        ],
    },
    {
        timestamps: true,
    }
);

tweetSchema.pre("remove", async function (next) {
    try {
        let user = await User.findById(this.user);
        user.tweets.remove(this.id);
        //TODO: optimise this query
        await User.updateMany(
            { likedMessages: { $in: this.id } },
            { $pull: { likedMessages: { $in: this.id } } }
        );
        await user.save();

        return next();
    } catch (err) {
        return next(err);
    }
});

tweetSchema.index({ createdAt: -1 });

const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;
