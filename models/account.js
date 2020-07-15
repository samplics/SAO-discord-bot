const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  steamID64: String,
  dateAdded: String,
});

module.exports = mongoose.model("Account", accountSchema)
