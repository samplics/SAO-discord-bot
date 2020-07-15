const { RichEmbed, Client, Collection } = require("discord.js");
const { Command } = require('discord.js-commando');
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");
const Shop = require("../../models/item.js");
const Promter = require("discordjs-prompter");

module.exports = {
  name: "additem",
  category: "economy",
  aliases: "",
  descripton: "Adds an item to the shop!",
  usage: "<none>",
  run: async(client, message, args) => {
    if(!message.member.roles.some(r=>["Admin", "Moderator", "Support"].includes(r.name)) )
     return message.reply("Sorry, you don't have permissions to use this!");

    const questionList = ['What would you like the title of the item to be?', 'What would you like the price of the item to be?', 'What would you like the command to activate the item to be? (Don\'t include -buy)'];
    const responseList = await questionList.reduce(
      async (previousQuestions, currentQuestion, index) => {
        const responses = await previousQuestions;
        let question = currentQuestion;

        const messageCollection = await Promter.message(message.channel, {
          question,
          userId: message.author.id,
          timeout: 25000,
          max: 1,
        });

        const msg = messageCollection.first();
        const response = msg ? msg.content : null;

        return [...responses, response];
      },
      [],
    );

    mongoose.connect('mongodb://127.0.0.1/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
      let newItem = new Shop({
        _id: mongoose.Types.ObjectId(),
        title: responseList[0],
        price: responseList[1],
        command: responseList[2],
        dateAdded: message.createdAt,
        whoAdded: message.author.id
      });
      newItem.save()
        .catch(err => console.log(err).then(message.reply(' There was an error saving that item to the database.')));

      message.reply(` Item \`${responseList[0]}\` has been listed for ${responseList[1]} coins on \`${message.createdAt}\`. Use the command \`-buy ${responseList[2]}\` to purchase this item.`)
    })
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
