const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const SteamAPI = require('steamapi');
const api = new SteamAPI(config.steamkey);
var convert = require('steamidconvert')(config.steamkey);
const mongoose = require("mongoose");

module.exports = {
  name: "convert",
  category: "steam",
  aliases: "",
  descripton: "Converts a steam vanity url name into Steam IDs.",
  usage: "<vanity url name>",
  run: async(client, message, args) => {
    const vanity = args.join(" ");
    if(vanity == ""){
      message.reply(' you must include a steam vanity url. (Ex: Sampli)');
    } else{
      convert.convertVanity(vanity, function(err, res) {
        if(err){
          console.log(err);
        } else{
          api.getUserSummary(err, res).then(summary => {
            if (err) message.reply(" Invalid vanity URL. Try again.");
            var nickname = summary.nickname; var avatar = summary.avatar.large; var url = summary.url;
            var steamID = convert.convertToText(res);
            var steamID64 = res;
            const profileInfo = new RichEmbed()
              .setColor('#0099ff')
              .setTitle(`${nickname}'s Profile Information`)
              .setURL(url)
              .setThumbnail(avatar)
              .addField('SteamID', steamID)
              .addField('SteamID64', steamID64)
              .setTimestamp()
              .setFooter('Made by Sampli')

            message.channel.send(profileInfo);
          });
        }
      });
    }
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
