// todo: WIP

module.exports = (bot, oldx, newx) => {
  // console.log(newx)
  var names = {};
  // console.log(newx.guild.id)
  if (bot.announce) {
    if (newx.guild.id === 302286888306343947) {
      if (newx.voiceChannel) {
        // console.log(newx.user.username);
        // console.log(newx.voiceChannel.name);
        newx.guild.channels.forEach(e => {
          if (e.type === 'text') {
            if (names[newx.user.id]) {
              ttsName = names[newx.user.id];
            } else {
              ttsName = newx.nickname;
            }
            e.send(ttsName + ' has joined ' + newx.voiceChannel.name, { tts: bot.announce })
              .then(res =>
                res
                  .delete(1000)
                  .then(res => {
                    return;
                  })
                  .catch(err => {
                    console.log(err);
                  }),
              )
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    }
  }
};
