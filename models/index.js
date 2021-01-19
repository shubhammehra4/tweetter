const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(process.env.DB, {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

module.exports.User = require("./user");
module.exports.Tweet = require("./tweet");
