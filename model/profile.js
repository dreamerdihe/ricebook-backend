const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    username: String,
    status: String,
    following: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profiles"
        }
    ],
    email: String,
    phone: String,
    dob: String,
    zipcode: String,
    avatar: String   
});

module.exports = mongoose.model("Profiles", ProfileSchema)