const { Client, RichEmbed, Collection } = require('discord.js');
const client = new Client({
  disableEveryone: true
});
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/SAO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Money = require("./models/money.js");

const config = require("./config.json");
var fs = require('fs');

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

var jimp = require('jimp');

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

const activities_list = [`${config.prefix}help for command list`,"Visit https://steamaccounts.org/","-new to get support!","Always use a middleman!","Made by Sampli#4731"];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index], {type: 'PLAYING'});
    }, 10000);
});

client.on('guildMemberAdd', async member => {
  var message = `Welcome to Steam Dealers ${member}. If you wish to gain access to all of the channels you must do the command -verify <STEAMID64>. This binds your discord account with your steam on our server and allows us to properly identify you when you are trading. If you do not know your STEAMID64, you can find it at https://steamid.io/. Once you have done this have a good time in the server!`
  client.channels.get(config.welcomechannel).send(message);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(!message.guild) return;

  if(message.content.length > 4 && !message.content.startsWith('-')){
    Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) => {
      if(err) console.log(err);
      if(!money){
        const newMoney = new Money({
          userID: message.author.id,
          serverID: message.guild.id,
          money: 1,
          items: []
        });
        newMoney.save().catch(err => console.log(err));
      } else{
        money.money = money.money + 1;
        money.save().catch(err => console.log(err));
      }
    });
  }

  if(message.content.indexOf(config.prefix) !== 0) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if(!command) command = client.commands.get(client.aliases.get(cmd));

  if(command){
    command.run(client, message, args);
  }
});

client.login(config.token);
