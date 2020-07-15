const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const Money = require("../../models/money.js");

module.exports = {
  name: "coins",
  category: "economy",
  aliases: "",
  descripton: "Allows you to check how many coins you have",
  usage: "<user>",
  run: async(client, message, args) => {
    if(message.author.bot) return;
    let cUser = message.mentions.members.first();
    if(!cUser) return message.reply(' Please tag someone you want to check coins for.');
    cUser = message.mentions.members.first().id;
    let embed = new RichEmbed()
      .setTitle("Coins")
      .setThumbnail(message.mentions.members.first().user.displayAvatarURL);

    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      db.collection("money").find({ userID: cUser, serverID: message.guild.id}).toArray(function(err, res) {
        if (err) console.log(err);
        if (!res) {
          embed.setColor("RED");
          embed.addField("Error", "Sorry, you don't have any coins in this server...");
        } else {
          embed.setColor("BLURPLE");
          embed.addField(message.mentions.members.first().user.username, res[0].money + " coins.");
        }
          message.channel.send(embed)
      });
    });
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
