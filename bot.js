
var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');
var rbx = require('roblox-js');


var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');
var config = require('./Storage/client.json')

const prefix = '::';


bot.on('message', message => {


    var sender = message.author; // The person who sent the Message
    var msg = message.content.toUpperCase(); // Takes the message and makes it all uppercase
    var args = message.content.slice(prefix.length).split(" ");
    var cmd = args.shift().toLowerCase();

    if (sender.bot) return;

    try{
      let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(bot, message, args);
    } catch(e) {
    } finally {
      console.log(`${message.author.username} ran the command: ${cmd}`);
    }

});

bot.on('ready', () => {
  console.log('EXECUTIVE_SCPF Launched!') // Runs when the bot is Launched

  bot.user.setStatus('Online')

  bot.user.setActivity('Do ::help for a list of commands!')
});



// Login
bot.login(process.env.BOT_TOKEN);
