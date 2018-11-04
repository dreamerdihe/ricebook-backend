const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
sessionId: String
});

module.exports = mongoose.model("Session", SessionSchema);