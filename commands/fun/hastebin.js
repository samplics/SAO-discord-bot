const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");
const hastebin = require('hastebin-gen');

module.exports = {
  name: "hastebin",
  category: "fun",
  aliases: "",
  descripton: "Post something to hastebin",
  usage: "<message>",
  run: async(client, message, args) => {
    let haste = args.slice(0).join(" ")

    let type = args.slice(1).join(" ")

    if (!args[0]) { return message.reply(" Please include a message to upload to hastebin.") }

    hastebin(haste).then(r => {

        message.channel.send("`Posted to Hastebin at this URL:`  " + r);

    }).catch(console.error);

    message.delete();
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
