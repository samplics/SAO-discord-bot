const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const User = require("../../models/user.js")

module.exports = {
  name: "trusted",
  category: "info",
  aliases: "",
  descripton: "Shows all of the trusted people verified by the SAO Staff.",
  usage: "",
  run: async(client, message, args) => {
    User.find({isTrusted: "True"}).sort([['rep', 'descending']]).exec((err, res) => {
      if(err) console.log(err);

      const embed = new RichEmbed()
        .setTitle("Trusted Members")

      if(res.length === 0){
        embed.setColor("RED");
        embed.addField("No data found", "Add a trusted user!")
      } else{
        embed.setColor("BLURPLE");
        for(i = 0;i<res.length; i++){
          let member = message.guild.members.get(res[i].discordID) || "Member Left"
          if(member === "User Left"){
            embed.addField(`${member}`, `**Reputation**: ${res[i].rep}`);
          } else{
            embed.addField(`${member.user.username}`, `**Reputation**: ${res[i].rep}`);
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
