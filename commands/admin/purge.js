const { RichEmbed, Client } = require("discord.js");
const client = new Client();
const config = require("../../config.json");

module.exports = {
  name: "purge",
  category: "admin",
  aliases: "",
  descripton: "purges mass amounts of messages.",
  usage: "<amount>",
  run: async(client, message, args) => {
    if(!message.member.roles.some(r=>["Admin", "Moderator", "Support"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    client.channels.get(config.logchannel).send(`${message.author} has purged **${deleteCount}** messages in ${message.channel} at ${message.createdAt}`);
  }
}
