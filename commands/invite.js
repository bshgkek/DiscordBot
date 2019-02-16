exports.run = (bot, msg) => {
  msg.channel.send(
    `https://discordapp.com/oauth2/authorize?client_id=${
      bot.auth.clientId
    }&scope=bot&permissions=2146958591`,
  );
};

exports.info = {
  name: 'invite',
  description: 'give invite link',
  use: 'invite',
  aliases: ['inv'],
};
