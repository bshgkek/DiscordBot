const Discord = require('discord.js');

exports.run = (bot, msg) => {
  if (msg.author.id !== bot.auth.myId) return;
  const embed = new Discord.RichEmbed()
    .addField(
      '**Delete**',
      'add users to delete.js - \nex. `!delete me 5` - deletes my last 5 messages\nex. `!delete <user> 5` - deletes <user>s last 5 messages\nChange current to `!delete last <number>` instead of `!delete <number>`? ',
    )
    .addField(
      '**Reddit**',
      'use "request" to get JSON for reddit instead of using api wrapper\n not sure how to get all time posts from json\n ex. https://www.reddit.com/r/redditdev/top.json only gets 24h top',
    );

  msg.channel.send({ embed });
};

exports.info = {
  name: 'todo',
  description: 'what to do',
  use: 'todo',
  aliases: [],
};
