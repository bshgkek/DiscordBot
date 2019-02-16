const Discord = require('discord.js');

exports.createEmbed = ({
  color = '',
  title = '',
  desc = '',
  fields = [],
  image = '',
  url = '',
  thumbnail = '',
  author = '',
  footer = '',
}) => {
  const embed = new Discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)
    .setImage(image)
    .setURL(url)
    .setAuthor(author)
    .setThumbnail(thumbnail)
    .setFooter(footer);

  // todo: change this to not be super error prone?
  for (let i = 0; i < fields.length; i++) {
    const { name, value } = fields[i];
    if (name && value) {
      embed.addField(name, value);
    }
  }

  return embed;
};

exports.colors = {
  red: '#ff0000',
  white: '#ffffff',
  yellow: '#ffff00',
  lightGreen: '#0ee62c',
  green: '#00ff00',
  twitter: {
    blue: '#1DA1F2',
  },
};
