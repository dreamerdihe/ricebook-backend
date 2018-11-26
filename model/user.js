const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hashedPassword: String,
    thirdParty: [{
        party: String,
        username: String
    }]
});

module.exports = mongoose.model("Users", UserSchema);