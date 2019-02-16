exports.run = (bot, msg, after) => {
  const searchUrl = 'https://discord.js.org/#/docs/main/stable/search?q=';

  if (!after) {
    msg.channel.send('**!api Usage**\n```!api <search term>```');
  } else {
    const searchTerm = after.split(' ').join('%20');

    msg.channel.send(searchUrl + searchTerm);
  }
};

exports.info = {
  name: 'api',
  description: 'print out link to api for search term',
  use: 'api <category>',
  aliases: [],
};
