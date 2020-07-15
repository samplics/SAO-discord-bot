const { RichEmbed } = require("discord.js");
var fs = require('fs');
var request = require("request");
const SteamAPI = require('steamapi');
const api = new SteamAPI("4ACFC8333B4E7F289CED7D8BC08AEE0A");
const talkedRecently = new Set();

module.exports = {
  name: "float",
  category: "steam",
  description: "Returns CS:GO item information from its inspect link.",
  usage: "<item inspect link>",
  run: async(client, message, args) => {
    if (talkedRecently.has(message.author.id)) return message.reply(' Wait 5 seconds before using this command again!');
    const noLink = new RichEmbed()
      .setColor('#0099ff')
      .setDescription('You must include the weapon inspect link. Example: -float {url}')

    const inspectLink = args.join(" ");
    if(inspectLink == ""){
      message.channel.send(noLink);
    } else{
      request({
        url: "https://api.csgofloat.com/?url="+inspectLink,
        json: true
      }, function(error, response, item) {
        if (!error && response.statusCode === 200) {
          const itemInfo = new RichEmbed()
            .setTitle(item.iteminfo.full_item_name)
            .addField('Wear: ', item.iteminfo.wear_name)
            .addField('Float: ', item.iteminfo.floatvalue)
            .addField('Paint Seed: ', item.iteminfo.paintseed)
            .setImage(item.iteminfo.imageurl)
            .setFooter('Information courtesy of csgofloat.com api.')

          message.channel.send(itemInfo);
        }
      });
    }
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
  }
}
