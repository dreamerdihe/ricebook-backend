const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
        author: String,
        body: String,
        date: {
                type: Date, 
                default: Date.now
        }
});

module.exports = mongoose.model("Comments", CommentSchema)