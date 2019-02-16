const { colors, createEmbed } = require('../utils.js');

exports.run = (bot, msg) => {
  const phrases = [
    {
      phrase: 'It is decidedly so',
      value: 1,
    },
    {
      phrase: 'Without a doubt',
      value: 1,
    },
    {
      phrase: 'Yes definitely',
      value: 1,
    },
    {
      phrase: 'You may rely on it',
      value: 1,
    },
    {
      phrase: 'As I see it, yes',
      value: 1,
    },
    {
      phrase: 'Most likely',
      value: 1,
    },
    {
      phrase: 'Outlook good',
      value: 1,
    },
    {
      phrase: 'Yes',
      value: 1,
    },
    {
      phrase: 'Signs point to yes',
      value: 1,
    },
    {
      phrase: 'Reply hazy try again',
      value: 0,
    },
    {
      phrase: 'Ask again later',
      value: 0,
    },
    {
      phrase: 'Better not tell you now',
      value: 0,
    },
    {
      phrase: 'Cannot predict now',
      value: 0,
    },
    {
      phrase: 'Concentrate and ask again',
      value: 0,
    },
    {
      phrase: "Don't count on it",
      value: -1,
    },
    {
      phrase: 'My reply is no',
      value: -1,
    },
    {
      phrase: 'My sources say no',
      value: -1,
    },
    {
      phrase: 'Outlook not so good',
      value: -1,
    },
    {
      phrase: 'Very doubtful',
      value: -1,
    },
  ];

  let color;
  const { phrase, value } = phrases[Math.floor(Math.random() * phrases.length)];
  if (value === 1) {
    color = colors.green;
  } else if (value === 0) {
    color = colors.yellow;
  } else {
    color = colors.red;
  }

  msg.channel
    .send(
      createEmbed({
        color,
        thumbnail: 'http://i.imgur.com/0A8ybRt.png',
        fields: [{ name: '**Magic CONCH**', value: phrase }],
      }),
    )
    .catch(console.error);
};

exports.info = {
  name: '8ball',
  description: 'Print random 8ball response',
  use: '8ball <question>',
  aliases: ['conch'],
};
