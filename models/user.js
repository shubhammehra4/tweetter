const mongoose = require("mongoose"),
    bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        bio: {
            type: String,
            maxlength: 160,
        },
        location: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        profileImageID: {
            type: String,
        },
        profileImage: {
            type: String,
        },
        profileImageThumb: {
            type: String,
        },
        tweets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweet",
            },
        ],
        likedTweets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweet",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweet",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    try {
        //If password is not changed
        if (!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 13);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
