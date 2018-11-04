const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    username: String,
    sessionId: String
});

module.exports = mongoose.model("Session", SessionSchema);