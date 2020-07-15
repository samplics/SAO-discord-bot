const { RichEmbed, Client } = require("discord.js");
const client = new Client();
var fs = require('fs');
var request = require("request");
const SteamAPI = require('steamapi');
const api = new SteamAPI("4ACFC8333B4E7F289CED7D8BC08AEE0A");
const User = require("../../models/user.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
var sCode = [];
var tries = 0;

module.exports = {
  name: "verify",
  category: "steam",
  description: "Verifies your discord account with your steam account in this server.",
  usage: "<steamid64>",
  run: async(client, message, args) => {
    function userCode(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }
    var userCode = userCode(5, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ9876543210');
    sCode.push(userCode);
    const steamID = args.join(" ");
    if(steamID == ""){
      message.channel.send("Please provide a **SteamID64** to verify your account. Example: -verify 8328523852322 (To find your SteamID64 go to https://steamid.io)");
    } else{
      api.getUserSummary(steamID).then(summary => {
        var nickname = summary.nickname;
        xtries = tries - 1
        if(nickname.includes(sCode[xtries])){
          mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true });

          const user = new User({
            _id: mongoose.Types.ObjectId(),
            discordID: message.author.id,
            steamID64: steamID,
            rep: "0",
            timeVerified: message.createdAt,
            isTrusted: "False"
          });
          user.save()
            .catch(err => console.log(err).then(message.reply(' There was an error saving your user to database.')));

          var toRole = message.guild.members.get(message.author.id);
          var role = message.guild.roles.find('name', 'Member')
          toRole.addRole(role);
          message.reply(" You have been successfully verified!")
        } else{
          message.channel.send("Please add '**"+sCode[tries]+"**' to your steam name and run the command again.");
          message.channel.send("This can be done here https://steamcommunity.com/profiles/"+steamID+"/edit");
          tries = tries + 1;
        }
      });
    }
  }
}
