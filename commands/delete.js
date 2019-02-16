const { createEmbed, colors } = require('../utils.js');
const Discord = require('discord.js');

exports.run = (bot, msg, after) => {
  const [type, amount] = after.split(' ');

  if (msg.author.id !== bot.auth.myId) {
    return;
  }
  if (!after || isNaN(amount)) {
    msg.channel.send(
      createEmbed({
        color: colors.red,
        title: '**Usage**',
        desc: '**!delete** <last/mention/me> <number <= 50>',
      }),
    );
    return;
  }

  if (type === 'reset') {
    bot.deleted = new Discord.Collection();
    msg.channel.send('Delete cache reset.');
  } else if (type === 'last') {
    // + 1 to include the message just sent
    let newAmount = Number(amount) + 1;
    if (newAmount > 50) {
      newAmount = 50;
    }
    msg.channel
      .fetchMessages({ limit: newAmount })
      .then(res => {
        msg.channel
          .bulkDelete(res)
          .then(res => {
            res.forEach(message => {
              bot.deleted[message.id] = {
                user: message.author.username,
                content: message.content,
                guild: message.guild.name,
              };
            });
          })
          .catch(console.error);
      })
      .catch(console.error);
  } else if (type === 'me') {
    let newAmount = Number(amount) + 1;
    if (newAmount > 50) {
      newAmount = 50;
    }

    msg.channel
      .fetchMessages({ limit: 100 })
      .then(messages => {
        let toDelete;
        const filteredMessages = messages.filter(message => message.author.id === msg.author.id);
        if (filteredMessages.array().length < amount) {
          toDelete = filteredMessages.array();
        } else {
          toDelete = filteredMessages.array().slice(0, after);
        }
        msg.channel
          .bulkDelete(toDelete)
          .then(res => {
            res.forEach(message => {
              bot.deleted[message.id] = {
                user: message.author.username,
                content: message.content,
                guild: message.guild.name,
              };
              console.log(`${toDelete.length - 1} messages deleted.`);
            });
          })
          .catch(console.error);
        return;
      })
      .catch(console.error);
  } else if (after[0] === '????') {
    // todo: mentions
  } else {
    msg.channel.send(
      createEmbed({
        color: colors.red,
        title: '**Usage**',
        desc: '**!delete** <last/mention/me> <number <= 50>',
      }),
    );
    return;
  }
};

exports.info = {
  name: 'delete',
  description: 'delete messages in a channel',
  use: 'delete <number>',
  aliases: ['del'],
};
