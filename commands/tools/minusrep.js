const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const repRecently = new Set();

module.exports = {
  name: "minusrep",
  category: "tools",
  aliases: "",
  descripton: "Subtracts a reputation point from a user",
  usage: "<@user>",
  run: async(client, message, args) => {
    if (repRecently.has(message.author.id)) return message.reply(' You can only add reputation once every 10 minutes.');
    if(message.author.bot) return;
    let rUser = message.mentions.members.first();
    if(!rUser) return message.reply(" I cannot find that user.");
    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      db.collection("users").find({ discordID: rUser.id }).toArray(function(err, result) {
        if (err) throw err;
        if(result[0].discordID == message.author.id){
          message.reply(' You cannot subtract a reputation point from yourself!')
        } else{
          var newRep = result[0].rep +1;
          db.collection("users").updateOne({ discordID: rUser.id }, { $set: { rep: newRep } }, function(err, res) {
            if (err) throw err;
            message.reply(` Successfully subtracted a reputation point from ${rUser}!`);
            db.close();
          });
        }
      });
    });
    repRecently.add(message.author.id);
    setTimeout(() => {
      repRecently.delete(message.author.id);
    }, 600000);
  }
}

// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
