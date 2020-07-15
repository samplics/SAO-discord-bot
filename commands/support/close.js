const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "close",
  category: "support",
  aliases: "",
  descripton: "Closes a support ticket",
  usage: "",
  run: async(client, message, args) => {
    if(message.channel.name.includes('ticket')){
      message.reply(` Deleting channel in 3 seconds...`)
      setTimeout(function () {
        message.channel.delete();
      }, 3000);

      let logchannel = message.guild.channels.find(cl => cl.name == "logs" && cl.type == "text")
      let logchannelembed1 = new RichEmbed()
        .setColor('RED')
        .setTitle(`Ticket Closed`)
        .setDescription(`Closed By: ${message.author}\nTicket: \`${message.channel.name}`)

      logchannel.send(logchannelembed1)
    } else{
      message.reply(' You can only close a ticket channel!')
    }
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
