const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "mm",
  category: "tools",
  aliases: "",
  descripton: "Creates a middleman channel for a safe deal.",
  usage: "<@user> <reason>",
  run: async(client, message, args) => {
    let mmUser = message.mentions.members.first();
    if(!mmUser) return message.reply(" I cannot find that user.");
    let mmReason = args.slice(1).join(" ");
    if(!mmReason) return message.reply(" Please provide a reason for opening a middleman deal.");

    var ticketNum = []
    var num = (Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111)
    ticketNum.push(num);

    var name = 'mm-' + ticketNum[ticketNum.length - 1];

    let channelsend1 = new RichEmbed()
      .setColor('#e64b0e')
      .setTitle(`Middleman Deal: ${ticketNum[ticketNum.length - 1]}`)
      .setDescription(`\n\nHello ${message.author},\n\nThank you for making a middleman ticket. A trusted middleman will help you as soon as they can.\n\n**Middleman Reason:** ${mmReason}`)

    let logchannelembed1 = new RichEmbed()
      .setColor('#52d411')
      .setTitle(`Ticket Created`)
      .setDescription(`Opened By: ${message.author}\nMiddleman Number: \`${ticketNum[ticketNum.length - 1]}\`\nMiddleman Reason: \`${mmReason}\``);

    message.guild.createChannel(name, { type: "text" }).then(
      (chan) => {
      chan.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
         'VIEW_CHANNEL': false
      });
      chan.overwritePermissions(message.guild.roles.find('name', 'Middleman'), {
          'VIEW_CHANNEL': true
      });
      chan.overwritePermissions(message.guild.roles.find('name', 'Support'), {
          'VIEW_CHANNEL': true
      });
      chan.overwritePermissions(message.guild.roles.find('name', 'Admin'), {
          'VIEW_CHANNEL': true
      });
      chan.overwritePermissions(mmUser.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false})
      chan.overwritePermissions(message.author.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false})
        let category = message.guild.channels.find(c => c.name == "middleman" && c.type == "category");

      //chan.setParent(category.id)
      chan.send(channelsend1)
      chan.setTopic(`Support Ticket ${ticketNum[ticketNum.length - 1]}`)

      let authorsend = new RichEmbed()
      .setColor('#e64b0e')
      .setDescription(`Middleman Deal Created, #${chan.name}`)

      let logchannel = message.guild.channels.find(cl => cl.name == "logs" && cl.type == "text")
      logchannel.send(logchannelembed1)
      message.channel.send(authorsend)
      message.delete()
    });
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
