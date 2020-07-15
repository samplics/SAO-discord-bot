const { RichEmbed, Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../../config.json");
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Shop = require("../../models/item.js");

module.exports = {
  name: "shop",
  category: "economy",
  aliases: "",
  descripton: "Shows all of the items in the shop.",
  usage: "<none>",
  run: async(client, message, args) => {
      Shop.find({__v: 0}).sort([['price', 'descending']]).exec((err, res) => {
        if(err) console.log(err);

        const embed = new RichEmbed()
          .setTitle("SAO Official Shop")
          .setColor("BLUE")
          .setThumbnail("https://cdn.discordapp.com/attachments/615189921531166752/673781154478030858/unknown.png")
          .setURL("https://discord.gg/egGHX9h")
          .setFooter("Shop requested by: "+message.author.username)

        if(res.length === 0){
          embed.setColor("RED");
          embed.addField("No data found", "Add some items to the shop!")
        } else{
          for(i = 0; i<res.length; i++){
            embed.addField(`**${res[i].title}**`, `Price: **${res[i].price}** coins\nCommand: \`${config.prefix}buy ${res[i].command}\``)
          }
        }
        message.channel.send(embed);
    });
  }
}

/* mongoose.connect('mongodb://127.0.0.1/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); */
// client.channels.get("").send(``);
//mongoose.connect('mongodb://127.0.0.1:27017/Reports', { useNewUrlParser: true, useUnifiedTopology: true });
