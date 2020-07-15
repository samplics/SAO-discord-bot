const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");
const request = require('request');

module.exports = {
  name: "cat",
  category: "fun",
  aliases: "",
  descripton: "Gives a random cat pic!",
  usage: "<none>",
  run: async(client, message, args) => {
    request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    let emb = new RichEmbed()
                    .setImage(body)
                    .setColor("#00ff00")
                    .setTitle("Here is your random cat")

                   message.channel.send(emb)
            }
        });
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
