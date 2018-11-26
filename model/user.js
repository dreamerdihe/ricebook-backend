const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hashedPassword: String,
    thirdParty: [String]
});

module.exports = mongoose.model("Users", UserSchema);