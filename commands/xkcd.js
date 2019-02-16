const Discord = require('discord.js');
const Request = require('request');

exports.run = (bot, msg, after) => {
  const [comicNumber] = after.split(' ');
  const { channel } = msg;
  if (!after) {
    channel.send(getEmbed(13379110, '**Usage**', '**!xkcd** <comic number>'));
    return;
  } else if (isNaN(comicNumber)) {
    channel.send(
      getEmbed(13379110, '**ERROR**', '**!xkcd** requires a valid <comic number> argument.'),
    );
    return;
  }

  const xkcdURL = 'https://xkcd.com/';
  const xkcdURL2 = '/info.0.json';

  new Request(`${xkcdURL}${comicNumber}${xkcdURL2}`, (err, res, body) => {
    const { title, img } = JSON.parse(body);
    channel.send(
      getEmbed(24120, `XKCD Comic # ${after}`, `[**${title}**](${xkcdURL}${comicNumber})`, img),
    );
  });
};

const getEmbed = function createDiscordEmbed(color, title, desc, image = '') {
  return new Discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)
    .setImage(image);
};

exports.info = {
  name: 'xkcd',
  description: 'xkcd',
  use: 'xkcd <comic number>',
  aliases: [],
};
