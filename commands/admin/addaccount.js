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
  name: "addaccount",
  category: "admin",
  aliases: "",
  descripton: "Adds an account to verified sold list",
  usage: "<STEAMID64>",
  run: async(client, message, args) => {
    if(!message.member.roles.some(r=>["Admin", "Moderator", "Support"].includes(r.name)) )
     return message.reply("Sorry, you don't have permissions to use this!");

     const steamID = args.join(" ");
     if(steamID == ""){
       message.reply(' You must include a SteamID64');
     } else{
       const toVerify = new Account({
         steamID64: steamID,
         dateAdded: message.createdAt
       });
       toVerify.save()
        .catch(err => message.reply(" There was an error saving this account to the database."))
        .then(message.reply(" Your account has been successfully added to the database!"))
     }
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
