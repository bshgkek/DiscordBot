const Reddit = require('snoowrap');
const Discord = require('discord.js');

exports.run = (bot, msg, after) => {
  // Error: Missing credentials passed to snoowrap constructor. You must pass an object containing either (a) userAgent, clientId, clientSecret, and refreshToken properties, (b) userAgent and accessToken properties, or (c) userAgent, clientId, clientSecret, username, and password properties. For information, please read the docs at https://not-an-aardvark.github.io/snoowrap/

  msg.channel.send('doesnt do anything rn..');
  return;

  if (!after) {
    const embed = new Discord.RichEmbed()
      .setColor(13379110)
      .setTitle('**ERROR**')
      .setDescription('**!reddit** requires a <subreddit> argument.');
    msg.channel.send({ embed });
    return;
  }

  const reddit = new Reddit({
    userAgent: 'discordbot:v1 (by /u/heycanyouuhh)',
    clientId: bot.auth.redditID,
    clientSecret: bot.auth.redditSecret,
    // refreshToken: 'put your refresh token here'
    username: bot.auth.redditUsername,
    password: bot.auth.redditPassword,
  });

  reddit
    .getSubreddit('askreddit')
    .getWikiPage('bestof')
    .content_md.then(console.log);
};

exports.info = {
  name: 'reddit',
  description: 'reddit',
  use: 'reddit <subreddit>',
  aliases: [],
};
