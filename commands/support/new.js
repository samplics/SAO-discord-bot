const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "new",
  category: "support",
  aliases: "",
  descripton: "Creates a new support ticket",
  usage: "",
  run: async(client, message, args) => {
    let reason = args.join(" ");
    if(reason == "") reason = "No reason supplied.";

    var ticketNum = []
    var num = (Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111)
    ticketNum.push(num);

    let channelsend1 = new RichEmbed()
      .setColor('#e64b0e')
      .setTitle(`Support Ticket: ${ticketNum[ticketNum.length - 1]}`)
      .setDescription(`\n\nHello ${message.author},\n\nThank you for making a ticket. The support team will help you as soon as they can.\n\n**Ticket Reason:** ${reason}`)

    let logchannelembed1 = new RichEmbed()
      .setColor('#52d411')
      .setTitle(`Ticket Created`)
      .setDescription(`Opened By: ${message.author}\nTicket Number: \`${ticketNum[ticketNum.length - 1]}\`\nTicket Reason: \`${reason}\``)

    var name = 'ticket-' + ticketNum[ticketNum.length - 1];
    message.guild.createChannel(name, { type: "text" }).then(
      (chan) => {
      chan.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
         'VIEW_CHANNEL': false
      })
      chan.overwritePermissions(message.guild.roles.find('name', 'Support'), {
          'VIEW_CHANNEL': true
      })
      chan.overwritePermissions(message.guild.roles.find('name', 'Admin'), {
          'VIEW_CHANNEL': true
      });
      chan.overwritePermissions(message.author.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false})
        let category = message.guild.channels.find(c => c.name == "Tickets" && c.type == "category");
        if(!category) return message.channel.send(categorysend)

      //chan.setParent(category.id)
      chan.send(channelsend1)
      chan.setTopic(`Support Ticket ${ticketNum[ticketNum.length - 1]}`)

      let authorsend = new RichEmbed()
      .setColor('#e64b0e')
      .setDescription(`Ticket Created, #${chan.name}`)

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
