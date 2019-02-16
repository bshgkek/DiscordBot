const { colors, createEmbed } = require('../utils.js');

exports.run = (bot, msg) => {
  if (msg.author.id !== bot.auth.myId) {
    return;
  }
  const {
    mentions,
    mentions: { members },
  } = msg;

  const { guild } = msg;

  let errorMessage;

  const first = members.first();
  if (mentions.everyone) {
    errorMessage = '**!kick** cannot be used with @everyone or @here.';
  } else if (!first) {
    errorMessage = '**!kick** requires one <user> argument.';
  } else if (!first.kickable) {
    errorMessage = 'I am unable to kick that user';
  } else if (!guild.me.hasPermission('KICK_MEMBERS')) {
    errorMessage = 'I do not have permission to kick users.';
  } else {
    first
      .kick()
      .then(res => {
        msg.channel.send(
          createEmbed({
            color: 'RED',
            title: '**KICKED**',
            desc: `**${res.user.username}** was kicked from **${guild.name}**.`,
          }),
        );
        return;
      })
      .catch(console.error);
  }
  if (errorMessage) {
    msg.channel.send(
      createEmbed({
        color: 'RED',
        title: '**ERROR**',
        desc: errorMessage,
      }),
    );
  }
};

exports.info = {
  name: 'kick',
  description: 'Kick a user from the channel.',
  use: 'kick <user>',
  aliases: ['boot'],
};
