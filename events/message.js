module.exports = (bot, msg) => {
  const { author, content, channel } = msg;
  const {
    commands,
    aliases,
    user,
    config: { commandPrefix },
  } = bot;

  if (author === user || !content.startsWith(commandPrefix)) {
    return;
  }

  if (content === '!commands') {
    channel.send(commands.keyArray().join(', '));
  }

  const command = content.split(' ')[0].replace(commandPrefix, '');
  const args = content.substring(command.length + 2, content.length);
  let cmdFile = commands.get(command.toLowerCase());

  if (cmdFile) {
    cmdFile.run(bot, msg, args);
  } else {
    cmdFile = commands.get(aliases.get(command.toLowerCase()));
  }
};
