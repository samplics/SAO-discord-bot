const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "add",
  category: "support",
  aliases: "",
  descripton: "Adds a user to a support ticket",
  usage: "<user>",
  run: async(client, message, args) => {
    let added = message.mentions.members.first();
    if(!added) return message.reply(" I cannot find that user.");

    message.channel.overwritePermissions(added.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false})
    message.reply(` Successfully added ${added} to the ticket.`)
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
