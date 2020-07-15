const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "",
  category: "",
  aliases: "",
  descripton: "",
  usage: "",
  run: async(client, message, args) => {

  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
