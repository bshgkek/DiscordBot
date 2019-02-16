const Twitter = require('twitter');
const { colors, createEmbed } = require('../utils.js');

exports.run = (bot, msg, after) => {
  const {
    channel,
    author: { id: authorId },
  } = msg;
  const {
    auth: { myId, twConsumerKey, twSecretKey, twToken, twSecret },
    config: { twitterUsername, stream },
  } = bot;

  if (!after) {
    channel.send('**!twitter Usage**');
    channel.send(
      createEmbed({
        fields: [
          { name: 'Send a tweet', value: '!twitter tweet <tweet>' },
          { name: 'Send a tweet with stream linked', value: '!twitter stream <tweet>' },
          { name: 'Delete last tweet', value: '!twitter delete' },
          { name: 'Get last tweet of <username>', value: '!twitter last <username>' },
        ],
      }),
    );
    return;
  }
  const client = new Twitter({
    consumer_key: twConsumerKey, // eslint-disable-line camelcase
    consumer_secret: twSecretKey, // eslint-disable-line camelcase
    access_token_key: twToken, // eslint-disable-line camelcase
    access_token_secret: twSecret, // eslint-disable-line camelcase
  });

  const [first, ...rest] = after.split(' ');
  const status = rest.join(' ');
  if (first === 'tweet') {
    if (authorId !== myId) {
      return;
    }
    if (status.length > 280) {
      channel.send(`Tweet > 280 characters (${status.length} characters).\nPlease try again.`);
      return;
    }
    client.post('statuses/update', { status }, (error, tweet, response) => {
      if (error) {
        console.log(error);
      }

      const t1 = JSON.parse(JSON.stringify(response));
      const t2 = JSON.parse(t1.body);
      channel.send(`Tweet sent: https://twitter.com/${twitterUsername}/status/${t2.id_str}`);
    });
  } else if (first === 'stream') {
    if (authorId !== myId) {
      return;
    }
    const streamStatus = `${status} ${stream}`;
    if (streamStatus.length > 280) {
      channel.send(
        `Tweet > 280 characters (${streamStatus.length} characters).\nPlease try again.`,
      );
      return;
    }
    client.post('statuses/update', { status: streamStatus }, (error, tweet, response) => {
      if (error) {
        throw error;
      }

      const {
        body: { id_str: idString },
      } = JSON.parse(JSON.stringify(response));
      channel.send(`Tweet sent: https://twitter.com/${twitterUsername}/status/${idString}`);
    });
  } else if (first === 'delete') {
    if (authorId !== myId) {
      return;
    }
    client.get(
      'statuses/user_timeline',
      { screen_name: twitterUsername, count: 1 },
      (error, tweet) => {
        if (error) throw error;
        const [{ id_str: idString, text }] = tweet;
        client.post('statuses/destroy/', { id: idString }, error => {
          if (error) {
            console.log(error);
            throw error;
          }
          channel.send(`Tweet \`${text}\` has been deleted.`);
        });
      },
    );
  } else if (first === 'last') {
    if (rest.length !== 1) {
      channel.send(
        createEmbed({
          color: colors.red,
          title: '**ERROR**',
          desc: 'Too many or too few arguments. Type `twitter` to see usage',
        }),
      );
      return;
    }
    const [user] = rest;
    client.get('statuses/user_timeline', { screen_name: user, count: 1 }, (error, tweet) => {
      if (error) {
        channel.send(error);
      }
      const [{ id_str: idString, text }] = tweet;

      channel.send(
        createEmbed({
          color: colors.twitter.blue,
          desc: text,
          title: `Last tweet by @${user}:`,
          url: `https://twitter.com/${user}/status/${idString}`,
          thumbnail: 'http://i.imgur.com/RmqJ0x3.png',
        }),
      );
      return;
      // msg.channel.send("Last tweet by **"+x+":** ```"+twt+"```\n"+"https://twitter.com/"+x+"/status/"+tweet[0].id_str)
    });
  }
};

exports.info = {
  name: 'twitter',
  description: 'twitter',
  use: 'twitter',
  aliases: ['tw'],
};
