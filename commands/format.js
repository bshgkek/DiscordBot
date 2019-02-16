exports.run = (bot, msg) => {
  msg.channel.send(
    '*italics* = \\*italics*\n**bold** = \\*\\*bold\\*\\*\n***bold italics*** = \\*\\*\\*bold italics\\*\\*\\*\n~~strikeout~~ = \\~\\~strikeout\\~\\~\n__underline__ = \\_\\_underline\\_\\_\n__*underline italics*__ = \\_\\_\\*underline italics\\*\\_\\_\n__**underline bold**__ = \\_\\_\\*\\*underline bold\\*\\*\\_\\_\n__***underline bold italics***__ = \\_\\_\\*\\*\\*underline bold italics\\*\\*\\*\\_\\_\n`one line code block` = \\`one line code block\\````\nmulti line\ncode block\n``` = \n\\`\\`\\`\nmulti line\ncode block\n\\`\\`\\````js\nfunction test (paramaters) {\n\tconsole.log("Test");\n}``` = \n\\`\\`\\`js\nfunction test (paramaters) {\n\tconsole.log("Test");\n}\n\\`\\`\\`',
  );
};

exports.info = {
  name: 'format',
  description: 'Displays formatting help for discord',
  use: 'format',
  aliases: [],
};
