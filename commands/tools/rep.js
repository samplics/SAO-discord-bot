const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "rep",
  category: "tools",
  aliases: "",
  descripton: "Gets the reputation of a user in the server.",
  usage: "<@user>",
  run: async(client, message, args) => {
    if(message.author.bot) return;
    let rUser = message.mentions.members.first();
    if(!rUser) return message.reply(" I cannot find that user.");
    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      db.collection("users").find({ discordID: rUser.id }).toArray(function(err, result) {
        if (err) throw err;
        const userRep = new RichEmbed()
          .setColor('#0099ff')
          .setTitle(`${rUser.user.username}'s Rep Info`)
          .setThumbnail(rUser.user.displayAvatarURL)
          .addField('DiscordID:', rUser.id)
          .addField('Reputation Points:', result[0].rep)
          .addField('SteamID64', result[0].steamID64)
          .addField('Time Verified:', result[0].timeVerified)

        message.channel.send(userRep);
        db.close();
      });
    });
  }
}

// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
