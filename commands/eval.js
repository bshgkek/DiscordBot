const { colors, createEmbed } = require('../utils.js');
const { inspect } = require('util');

exports.run = (bot, msg, after) => {
  const { channel, content } = msg;

  if (msg.author.id !== bot.auth.myId) {
    return;
  }
  if (content.toLowerCase().includes('auth')) {
    channel.send('[SECRET]');
    return;
  }

  try {
    if (!after) {
      channel.send(
        createEmbed({
          color: colors.red,
          title: '**ERROR**',
          desc: 'No arguments provided.',
        }),
      );
      return;
    }
    let result = eval(after); // eslint-disable-line no-eval

    if (typeof result !== 'string') result = inspect(result);

    console.log('EVAL: -----------------------');
    console.log(`Input: ${after}`);
    console.log(`Output: ${result}`);

    if (result.length > 2036) {
      throw new Error('Output too long, saved to console');
    }

    channel
      .send(
        createEmbed({
          color: colors.green,
          fields: [
            {
              name: '**INPUT**',
              value: `\`\`\`js\n${after}\n\`\`\``,
            },
            {
              name: '**OUTPUT**',
              value: `\`\`\`js\n${result}\n\`\`\``,
            },
          ],
        }),
      )
      .catch(console.error);
  } catch (err) {
    channel.send(`**INPUT:** \`${after}\``, {
      embed: {
        title: '<:panicbasket:267397363956580352>ERROR<:panicbasket:267397363956580352>',
        description: `\`\`\`xl\n${err}\n\`\`\``,
        color: 13379110,
      },
    });
    console.error(err);
  }
};

exports.info = {
  name: 'eval',
  description: 'Evaluate script',
  use: 'eval <script>',
  aliases: [],
};
