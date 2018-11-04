const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    id: Number,
    author: String,
    body: String,
    date: Date,
    picture: String, 
    comments: [{
        commentId: Number,
        author: String,
        body: String,
        date: Date
    }]
});

module.exports = mongoose.model("Posts", PostSchema)