const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");
const snekfetch = require('snekfetch');

module.exports = {
  name: "dog",
  category: "fun",
  aliases: "",
  descripton: "Gives a random dog pic!",
  usage: "<none>",
  run: async(client, message, args) => {
    const { body } = await snekfetch.get('https://random.dog/woof.json');
    const embed = new RichEmbed()
    .setColor("#00ff00")
    .setTitle("Here is your random dog!")
    .setImage(body.url);

    message.channel.send(embed);
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
