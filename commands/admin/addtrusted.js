const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "addtrusted",
  category: "admin",
  aliases: "",
  descripton: "Adds a member to the trusted list.",
  usage: "<@user>",
  run: async(client, message, args) => {
    if(!message.member.roles.some(r=>["Admin", "Moderator", "Support"].includes(r.name)) )
     return message.reply("Sorry, you don't have permissions to use this!");

    let toAdd = message.mentions.members.first();
    if(!toAdd) return message.reply(" I cannot find that user.");
    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        db.collection("users").find({ discordID: toAdd.id }).toArray(function(err, res){
        var newTrusted = "True";
        if(res[0].isTrusted == "True"){
          message.reply(" That account is already marked as trusted!");
        } else{
          db.collection("users").updateOne({ discordID: toAdd.id }, { $set: { isTrusted: newTrusted } }, function(err, res) {
              if (err) message.reply(" There was an error saving that to the database.");
              message.reply(` That account has been successfully marked as trusted.`);
              db.close();
            });
        }
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
