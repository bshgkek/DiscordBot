exports.run = (bot, msg, after) => {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed()
    .addField('!var user', 'Print user variables')
    .addField('!var message', 'Print message variables')
    .addField('!var client', 'Print client variables')
    .addField('!var channel', 'Print channel variables')
    .addField('!var guild', 'Print guild variables');
  const { channel, author, guild, client } = msg;

  if (!after) {
    msg.channel.send('**!var Usage**');
    msg.channel.send({ embed });
  } else if (after.split(' ').length > 1) {
    return;
  } else if (after === 'msg' || after === 'message') {
    msg.channel.send(
      `**MESSAGE PROPERTIES:** \n\`\`\`\nattachments: ${
        msg.attachments
      }\nauthor: ${author}\nchannel: ${channel}\ncleanContent: ${
        msg.cleanContent
      }\nclient: ${client}\ncontent: ${msg.content}\ncreatedAt: ${
        msg.createdAt
      }\ncreatedTimestamp: ${msg.createdTimestamp}\ndeletable: ${msg.deletable}\neditable: ${
        msg.editable
      }\neditedAt: ${msg.editedAt}\neditedTimestamp: ${msg.editedTimestamp}\nedits: ${
        msg.edits
      }\nembeds: ${msg.embeds}\nguild: ${guild}\nid: ${msg.id}\nmember: ${msg.member}\nmentions: ${
        msg.mentions
      }\nnonce: ${msg.nonce}\npinnable: ${msg.pinnable}\npinned: ${msg.pinned}\nreactions: ${
        msg.reactions
      }\nsystem: ${msg.system}\ntts: ${msg.tts}\ntype: ${msg.type}\nwebhookID: ${
        msg.webhookID
      }\`\`\``,
    );
  } else if (after === 'user') {
    // "\ndefaultAvatarURL: " + msg.author.defaultAvatarURL
    channel.send(
      `**USER PROPERTIES:** \n\`\`\`avatar: ${author.avatar}\navatarURL: ${
        author.avatarURL
      }\nbot: ${author.bot}\nclient: ${author.client}\ncreatedAt: ${
        author.createdAt
      }\ncreatedTimestamp: ${author.createdTimestamp}\ndiscriminator: ${
        author.discriminator
      }\ndisplayAvatarURL: ${author.displayAvatarURL}\ndmChannel: ${author.dmChannel}\nid: ${
        author.id
      }\nlastMessageID: ${author.lastMessageID}\nnote: ${author.note}\npresence: ${
        author.presence
      }\nusername: ${author.username}\`\`\``,
    );
  } else if (after === 'guild') {
    channel.send(
      `*GUILD PROPERTIES:** \n\`\`\`afkChannelID: ${guild.afkChannelID}\nafkTimeout: ${
        guild.afkTimeout
      }\napplicationID: ${guild.applicationID}\navailable: ${guild.available}\nchannels: ${
        guild.channels
      }\nclient: ${guild.client}\ncreatedAt: ${guild.createdAt}\ncreatedTimestamp: ${
        guild.createdTimestamp
      }\ndefaultChannel: ${guild.defaultChannel}\nembedEnabled: ${guild.embedEnabled}\nemojis: ${
        guild.emojis
      }\nfeatures: ${guild.features}\nicon: ${guild.icon}\niconURL: ${guild.iconURL}\nid: ${
        guild.id
      }\njoinedAt: ${guild.joinedAt}\njoinedTimestamp: ${guild.joinedTimestamp}\nlarge: ${
        guild.large
      }\nmemberCount: ${guild.memberCount}\nmembers: ${guild.members}\nname: ${
        guild.name
      }\nowner: ${guild.owner}\nownerID: ${guild.ownerID}\npresences: ${guild.presences}\nregion: ${
        guild.region
      }\nroles: ${guild.roles}\nsplash: ${guild.splash}\nsplashURL: ${
        guild.splashURL
      }\nverificationLevel: ${guild.verificationLevel}\nvoiceConnection: ${
        guild.voiceConnection
      } '\`\`\``,
    );
  } else if (after === 'client') {
    channel.send(
      `**CLIENT PROPERTIES:** \n\`\`\`\nbrowser: ${client.browser}\nchannels: ${
        client.channels
      }\nemojis: ${client.emojis}\nguilds: ${client.guilds}\noptions: ${client.options}\nping: ${
        client.ping
      }\npings: ${client.pings}\npresences: ${client.presences}\nreadyAt: ${
        client.readyAt
      }\nreadyTimestamp: ${client.readyTimestamp}\nshard: ${client.shard}\nstatus: ${
        client.status
      }\ntoken: ${client.token}\nuptime: ${client.uptime}\nuser: ${client.user}\nusers: ${
        client.users
      }\nvoiceConnections: ${client.voiceConnections}\`\`\``,
    );
  } else if (after === 'channel') {
    channel.send(
      `**CHANNEL PROPERTIES:** \n\`\`\`\nguild: ${channel.guild}\nlastMessageID: ${
        channel.lastMessageID
      }\nmembers: ${channel.members}\nmessages: ${channel.messages}\nname: ${
        channel.name
      }\npermissionOverwrites: ${channel.permissionOverwrites}\nposition: ${
        channel.position
      }\ntopic: ${channel.topic}\ntyping: ${channel.typing}\ntypingCount: ${
        channel.typingCount
      }\`\`\``,
    );
  } else {
    channel.send(`\`\`\`${after}\`\`\`**Not a valid argument**\n--\n**!var Usage**`);
    channel.send({ embed });
  }
};

exports.info = {
  name: 'var',
  description: 'Print out a category of variables',
  use: 'var <category>',
  aliases: [],
};
