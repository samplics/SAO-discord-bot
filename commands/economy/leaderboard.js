const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Money = require("../../models/money.js")

module.exports = {
  name: "leaderboard",
  category: "economy",
  aliases: "",
  descripton: "Shows top coins in the server",
  usage: "",
  run: async(client, message, args) => {
    Money.find({serverID: message.guild.id}).sort([['money', 'descending']]).exec((err, res) => {
      if(err) console.log(err);

      const embed = new RichEmbed()
        .setTitle("Top Coins Leaderboard")

      if(res.length === 0){
        embed.setColor("RED");
        embed.addField("No data found", "Get more active in chat!")
      }
      else if(res.length < 10){
        embed.setColor("BLURPLE");
        for(i = 0;i<res.length; i++){
          let member = message.guild.members.get(res[i].userID) || "Member Left"
          if(member === "User Left"){
            embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].money}`);
          } else{
            embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].money}`);
          }
        }
      } else{
        embed.setColor("BLURPLE");
        for(i = 0; i<10; i++){
          let member = message.guild.members.get(res[i].userID) || "Member Left"
          if(member === "User Left"){
            embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].money}`);
          } else{
            embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].money}`);
          }
        }
      }
      message.channel.send(embed);
    });
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
