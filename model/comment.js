const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
        author: String,
        body: String,
        date: Date
});

module.exports = mongoose.model("Comments", CommentSchema)