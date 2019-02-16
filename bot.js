const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();

bot.auth = require('./authentication.json');
bot.config = require('./config.json');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.deleted = new Discord.Collection();
bot.fudge = new Map();
bot.announce = false;

console.log('Loading commands...');

fs.readdir('./commands', (err, files) => {
  if (err) {
    return console.error(err);
  }
  for (let i = files.length - 1; i >= 0; i--) {
    const file = files[i];
    const data = require(`./commands/${file}`);
    bot.commands.set(data.info.name, data);
    for (let i = data.info.aliases.length - 1; i >= 0; i--) {
      bot.aliases.set(data.info.aliases[i], data.info.name);
    }
  }
  console.log(`Loaded ${bot.commands.size} commands!`);
});

console.log('Loading event listeners...');

fs.readdir('./events', (err, files) => {
  if (err) return console.error(err);

  for (let i = files.length - 1; i >= 0; i--) {
    bot.on(files[i].split('.')[0], require(`./events/${files[i]}`).bind(null, bot));
  }
  console.log('Listeners loaded!');
});

bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.tag} Serving in ${bot.guilds.array().length} servers`);
  bot.user
    .setActivity(`${bot.config.commandPrefix}help | ${bot.guilds.array().length} Server(s)`)
    .then(() => {
      console.log('Initial game set.');
      console.log('Start-----------------');
    });
});

bot.login(bot.auth.botToken).catch(err => {
  console.error(err);
  console.log('Error on login.\nCheck that your token is correct.');
  // exec("pm2 stop selfbot", null, () => {
  // process.exit(1);
  // });
});

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err.stack}`));
