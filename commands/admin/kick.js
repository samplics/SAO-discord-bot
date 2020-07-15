const { RichEmbed, Client } = require("discord.js");
const client = new Client();
const config = require("../../config.json");

module.exports = {
  name: "kick",
  category: "admin",
  aliases: "",
  descripton: "kicks a member",
  usage: "<mention | id> <reason>",
  run: async(client, message, args) => {
    if(!message.member.roles.some(r=>["Admin", "Moderator", "Support"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.kickable)
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";

      await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

      const kickedMember = new RichEmbed()
        .setColor('#0099ff')
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL)
        .addField('Name:', member.displayName)
        .addField('Discord ID:', member.id)
        .addField('Reason for Kick:', reason)
        .addField('Time Kicked', message.createdAt)
        .addField('Kicked By:', message.author)
        .setFooter('SAO Multibot', 'https://cdn.discordapp.com/attachments/615189921531166752/673781154478030858/unknown.png')

      client.channels.get(config.logchannel).send(kickedMember);
    }
}
