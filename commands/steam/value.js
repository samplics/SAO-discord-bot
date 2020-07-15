const { RichEmbed } = require("discord.js");
var fs = require('fs');
var request = require("request");
const SteamAPI = require('steamapi');
const api = new SteamAPI("4ACFC8333B4E7F289CED7D8BC08AEE0A");
const User = require("../../models/user.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "value",
  aliases: ["v"],
  category: "steam",
  description: "Display's inventory value information.",
  usage: "[none]",
  run: async(client, message, args) => {
    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      db.collection("users").find({ discordID: message.author.id }).toArray(function(err, result) {
        if (err) throw err;
        if(!result) return message.reply(" Your SteamID64 is not in the database. Do `-verify` to get in the database!")
        message.channel.send("Getting user inventory value.");
        var user = message.author.id;
        request({
          url: "http://csgobackpack.net/api/GetInventoryValue/?id="+result[0].steamID64,
          json: true
        }, function(error, response, value) {
          if (!error && response.statusCode === 200) {
              api.getUserSummary(result[0].steamID64).then(summary => {
                const inventoryValue = new RichEmbed()
                  .setTitle(summary.nickname+"'s Inventory Value")
                  .setThumbnail(summary.avatar.large)
                  .setURL(summary.url)
                  .addField('Inventory Value: ', '$'+value.value)
                  .addField('Total Items: ', value.items)
                  .setFooter('Inventory prices courtesy of csgobackpack.net')

                message.channel.send(inventoryValue);

                var trader = message.guild.members.get(message.author.id);
                setTimeout(function () {
                  if(value.value > 100000){
                    var role = message.guild.roles.find('name', '100000$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 100000$+ role, congratulations!`)
                  }
                  else if(value.value > 50000){
                    var role = message.guild.roles.find('name', '50000$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 50000$+ role, congratulations!`)
                  }
                  else if(value.value > 25000){
                    var role = message.guild.roles.find('name', '25000$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 25000$+ role, congratulations!`)
                  }
                  else if(value.value > 10000){
                    var role = message.guild.roles.find('name', '10000$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 10000$+ role, congratulations!`)
                  }
                  else if(value.value > 5000){
                    var role = message.guild.roles.find('name', '5000$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 5000$+ role, congratulations!`)
                  }
                  else if(value.value > 2500){
                    var role = message.guild.roles.find('name', '2500$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 2500$+ role, congratulations!`)
                  }
                  else if(value.value > 1000){
                    var role = message.guild.roles.find('name', '1000$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 1000$+ role, congratulations!`)
                  }
                  else if(value.value > 500){
                    var role = message.guild.roles.find('name', '500$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 500$+ role, congratulations!`)
                  }
                  else if(value.value > 250){
                    var role = message.guild.roles.find('name', '250$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 250$+ role, congratulations!`)
                  }
                  else if(value.value > 100){
                    var role = message.guild.roles.find('name', '100$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 100$+ role, congratulations!`)
                  }
                  else if(value.value > 25){
                    var role = message.guild.roles.find('name', '25$+')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the 25$+ role, congratulations!`)
                  } else{
                    var role = message.guild.roles.find('name', 'Trader')
                    trader.addRole(role);
                    message.channel.send(`${message.author}, You've got the Trader role, congratulations!`)
                  }
                  message.channel.send("If this is wrong, please update your inventory at http://csgobackpack.net/?nick="+result[0].steamID64);
                }, 1000);
            });
          }
        });
      });
    });
  }
}
