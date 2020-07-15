const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");
let giveMeAJoke = require('give-me-a-joke');

module.exports = {
  name: "joke",
  category: "fun",
  aliases: "",
  descripton: "Gives a funny joke!",
  usage: "<none>",
  run: async(client, message, args) => {
    giveMeAJoke.getRandomDadJoke(function(joke){
        message.channel.send(joke)
    });
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
