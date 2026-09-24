const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    // username and password and hashing and salt is added
});

userSchema.plugin(passportLocalMongoose);
// This added the additional prop in userSchema

module.exports = mongoose.model("User", userSchema);