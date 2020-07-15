const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  discordID: String,
  steamID64: String,
  rep: Number,
  timeVerified: String,
  isTrusted: String
});

module.exports = mongoose.model("User", userSchema);
