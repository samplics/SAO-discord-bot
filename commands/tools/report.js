const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "report",
  category: "tools",
  aliases: "",
  descripton: "Reports a member in the serber",
  usage: "<@user> <reason for report>",
  run: async(client, message, args) => {
    await message.delete();
    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true });
    if(message.author.bot) return;
    let rUser = message.mentions.members.first();
    if(!rUser) return message.reply(" I cannot find that user.");
    let rreason = args.slice(1).join(" ");
    if(!rreason) return message.reply(" Please provide a reason for reporting this user.");

    const sendReport = new RichEmbed()
      .setColor('#dc3545')
      .setTitle(`New Report for ${rUser.user.username}`)
      .setThumbnail(rUser.user.displayAvatarURL)
      .addField('Reported Username:', rUser.user.username)
      .addField('Reported UserID:', rUser.id)
      .addField('Report Reason:', rreason)
      .addField('Reporter Username:', message.author.username)
      .addField('Reporter UserID:', message.author.id)
      .addField('Time of Report:', message.createdAt)
      .setFooter('SAO Corebot by Sampli', 'https://cdn.discordapp.com/attachments/703316398054572088/703330719564431530/Avatar_00145.png')

    const report = new Report({
      _id: mongoose.Types.ObjectId(),
      username: rUser.user.username,
      userID: rUser.id,
      reason: rreason,
      rUsername: message.author.username,
      rID: message.author.id,
      time: message.createdAt
    });
    report.save()
      .catch(err => console.log(err).then(message.reply(' There was an error saving your report.')));

    client.channels.get(config.reportchannel).send(sendReport);
    message.reply(" Your report was sent! Thank you for keeping this community safe.");
  }
}
