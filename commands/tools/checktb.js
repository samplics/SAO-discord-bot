const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Account = require("../../models/account.js");

module.exports = {
  name: "checktb",
  category: "tools",
  aliases: "",
  descripton: "Checks database for tradebanned account.",
  usage: "<STEAMID64>",
  run: async(client, message, args) => {
    const steamID = args.join(" ");
    if(steamID == ""){
      message.reply(' You need a SteamID64 to check our records!')
    } else{
      let embed = new RichEmbed()
        .setColor('BLURPLE')
        .setTitle('TB Database Checker')

      Account.findOne({ steamID64: steamID }, (err, account) => {
        if(err) console.log(err);
        if(!account){
          embed.addField('Error!', `The SteamID64 (${steamID}) was not found in our database records.`);
          message.channel.send(embed);
        } else{
          embed.addField('Success!', `The SteamID64 (**${steamID}**) was found in our database records.`);
          message.channel.send(embed);
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
