const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");
const mongoose = require("mongoose");

module.exports = {
  name: "inventory",
  category: "economy",
  aliases: "inv",
  descripton: "Shows a list of all the items you or another user have purchased or acquired.",
  usage: "<none | @user>",
  run: async(client, message, args) => {
    const member = getMember(message, args.join(" "));

    mongoose.connect('mongodb://127.0.0.1:27017/SAO', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      db.collection("money").find({ userID: member.id, serverID: message.guild.id }).toArray(function(err, res){
        if(err) throw err;
        let embed = new RichEmbed()
          .setTitle(`${member.displayName}'s Inventory`)
          .setDescription(member.id)
          .setThumbnail(member.user.displayAvatarURL)

        if(res[0].items.length < 1){
          embed.addField(`Error!`, `You seem to have nothing in your inventory!`);
          embed.setColor('RED');
        } else{
          for(i=0;i<res[0].items.length;i++){
            embed.setColor('BLURPLE')
            embed.addField(`Item ${i+1}`, `**${res[0].items[i]}**`);
          }
        }
        message.channel.send(embed);
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
