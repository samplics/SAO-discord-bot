const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "remove",
  category: "support",
  aliases: "",
  descripton: "Removes a user from a support ticket",
  usage: "<user>",
  run: async(client, message, args) => {
    let removed = message.mentions.members.first();
    if(!removed) return message.reply(" I cannot find that user.");

    message.channel.overwritePermissions(removed.id, {'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'MENTION_EVERYONE': false})
    message.reply(` Successfully removed ${removed} from the ticket.`)
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
