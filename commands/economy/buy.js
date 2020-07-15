const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");
const prompter = require("discordjs-prompter");
const Shop = require("../../models/item.js");
const Money = require("../../models/money.js")

module.exports = {
  name: "buy",
  category: "economy",
  aliases: "",
  descripton: "Purchases an item from the shop.",
  usage: "<item command>",
  run: async(client, message, args) => {
    var item = args.join(" ");
    if(item == "") return message.reply(" You can't leave the item blank! (`-shop` for list of items!)");
    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      db.collection("items").find({ command: item }).toArray(function(err, res){
        if(err){message.reply(` There was an error saving information to the database.`);}

        prompter.message(message.channel, {
          question: `<@${message.author.id}>, Are you sure you want to buy \`${res[0].title}\` for \`${res[0].price}\` coins? (Y or N)`,
          userId: message.author.id,
          max: 1,
          timeout: 10000,
        }).then(responses => {
          if (!responses.size) {
            return message.reply(` You ran out of time. Purchase again later.`);
          }
          const response = responses.first();

          if(response == "Y"){
            db.collection("money").find({ userID: message.author.id, serverID: message.guild.id }).toArray(function(err, res2){
              if(err) message.reply(` There was an error saving information to the database.`);
              let newMoney = res2[0].money - res[0].price;
              let newItems = res2[0].items;
              newItems.push(res[0].title);
              db.collection("money").updateOne({ userID: message.author.id, serverID: message.guild.id }, { $set: { money: newMoney, items: newItems } },function(err, res3){
                if(err) message.reply(` There was an error saving information to the database.`);
                message.reply(` You have successfully purchased \`${res[0].title}\` for \`${res[0].price}\` coins!`);
              });
            });
          } else{
            message.reply(" Oh ok. Come again later.")
          }
        })
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
