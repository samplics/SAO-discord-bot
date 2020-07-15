const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "dice",
  category: "economy",
  aliases: "",
  descripton: "Bet coins on a dice roll!",
  usage: "<coins> <nice number>",
  run: async (client, message, args) => {
    let amt = parseInt(args[0]),
      num = parseInt(args[1]);
    if (args.length !== 2 || isNaN(amt) || amt < 1 || num < 1 || num > 6) return message.reply(' Incorrect syntax, please refer to "-help dice" to learn how to play');

    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        db.collection('money').find({ userID: message.author.id, serverID: message.guild.id }).toArray((err, result) => {
          if (err){
            console.log(err);
            message.reply(' There was an error retrieving your balance');
          }
          else if (result[0].money < amt){
            message.reply('You\'re too broke to bet that much!');
          } else{
            let roll = Math.floor((Math.random() * 6) + 1);
            message.reply(` You rolled a ${roll}`);
            db.collection('money').updateOne({ userID: message.author.id, serverID: message.guild.id }, { $inc: { money: roll === num ? 5 * amt : -amt, }})
              .then(result2 => {
                if (result2.writeError) {
                  console.log(`Issue setting user balance for (ID: ${message.author.id})`);
                  message.reply(' There was an error updating your balance. You have not lost anything.');
                } else if (roll === num) {
                  //log.debug(`${message.author.id} succesfully won ${5 * amt} tokens by playing Dice (Roll: ${roll}, Guess: ${num})`);
                  message.reply(` Congratulations you won \`${5 * amt}\` Tokens!`);
                } else {
                  //log.debug(`${message.author.id} succesfully lost ${amt} tokens by playing Dice (Roll: ${roll}, Guess: ${num})`);
                  message.reply(` Better luck next time.`);
                }
              });
            }
        });
    });
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
