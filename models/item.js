const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  price: Number,
  command: String,
  dateAdded: String,
  whoAdded: String
});

module.exports = mongoose.model("Item", itemSchema);
