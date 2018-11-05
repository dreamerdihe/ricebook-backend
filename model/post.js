const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profiles"
        },
        username: String
    },
    body: String,
    date: Date,
    picture: String, 
    comments: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        } 
    ]
});

module.exports = mongoose.model("Posts", PostSchema)