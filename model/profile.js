const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    username: String,
    status: String,
    following: [ String ],
    email: String,
    phone: String,
    dob: String,
    zipcode: String,
    avatar: String   
});

module.exports = mongoose.model("Profiles", ProfileSchema)