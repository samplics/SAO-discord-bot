const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const repRecently = new Set();

module.exports = {
  name: "addrep",
  category: "tools",
  aliases: "",
  descripton: "Adds a reputation point to a user",
  usage: "<@user>",
  run: async(client, message, args) => {
    if (repRecently.has(message.author.id)) return message.reply(' You can only add reputation once every 10 minutes.');
    if(message.author.bot) return;

    let rUser = message.mentions.members.first();
    if(!rUser) return message.reply(" I cannot find that user.");
    
    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      db.collection("users").find({ discordID: rUser.id }).toArray(function(err, result) {
        if(result[0].discordID == message.author.id){
          message.reply(' You cannot add a reputation point to yourself!')
        } else{
          var newRep = result[0].rep +1;
          db.collection("users").updateOne({ discordID: rUser.id }, { $set: { rep: newRep } }, function(err, res) {
            if (err) throw err;
            message.reply(` Successfully added a reputation point to ${rUser}!`);
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

//message.reply(" That user doesn't appear on our database, check are they verified?")

// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
