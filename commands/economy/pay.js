const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const Report = require("../../models/report.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Money = require("../../models/money.js");

module.exports = {
  name: "pay",
  category: "economy",
  aliases: "",
  descripton: "Allows you to transfer your coins to another user",
  usage: "<user>",
  run: async(client, message, args) => {

    await message.delete();

    let target = message.mentions.members.first();
    if (!target || target.id === message.author.id) return message.reply("Example: !pay @member 100");
    let amt = parseInt(args[1]);
    if (isNaN(amt) || amt < 1) return message.reply("Nice try, guys.").then(r => r.delete(10000));

    let embed = new RichEmbed()
      .setTitle("Pay")
      .setThumbnail(message.author.displayAvatarURL);

    Money.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, sendres) => {
      if (err) console.log(err);

      if (!sendres) {
        embed.setColor("RED");
        embed.addField("Error", "Sorry, you don't have any coins in this server...");
        return message.channel.send(embed);
      } else {
        if (amt > sendres.money) return message.reply("Sorry, thats more coins than what you have!").then(r => r.delete(10000));
        Money.findOne({
          userID: target.id,
          serverID: message.guild.id
        }, (err, targetres) => {
          if (err) console.log(err);

          sendres.money = sendres.money - amt;
          sendres.save().catch(err => console.log(err));

          if (!targetres) {
            const newTargetRes = new Money({
              userID: target.id,
              username: target.user.username,
              serverID: message.guild.id,
              money: amt
            })
            newTargetRes.save().catch(err => console.log(err))
          } else {
            targetres.money = targetres.money + amt;
            targetres.save().catch(err => console.log(err))
          }
        });
        embed.setColor("BLURPLE")
        embed.addField("Coins sent!", amt + " coins have been sent to " + target.user.username + ".")
        message.channel.send(embed);
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
