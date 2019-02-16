const { colors, createEmbed } = require('../utils.js');
const weather = require('weather-js');

exports.run = (bot, msg, after) => {
  const { channel } = msg;
  if (!after) {
    channel.send('**!weather Usage**\n```!weather <location/zipcode>```');
  } else {
    weather.find({ search: after, degreeType: 'F' }, (err, result) => {
      if (err) {
        console.log(err);
      } else if (!result.length) {
        channel.send(`:x: No results found for ${after}`);
      }
      const [
        {
          location: { name },
          current: { observationtime },
          forecast: [, , day1F, day2F, day3F],
        },
      ] = result;
      const [day0, day1, day2, day3] = getDayForecastStrings(result);
      channel
        .send(
          createEmbed({
            color: colors.white,
            title: `Weather conditions for ${name} at ${observationtime}`,
            desc: 'Powered by weather-js || [GitHub](https://github.com/devfacet/weather)',
            fields: [
              { name: '\nCurrently:', value: day0 },
              { name: `${day1F.day} ${day1F.date}`, value: day1 },
              { name: `${day2F.day} ${day2F.date}`, value: day2 },
              { name: `${day3F.day} ${day3F.date}`, value: day3 },
            ],
          }),
        )
        .catch(err => {
          console.log(err);
        });
    });
  }
};

exports.info = {
  name: 'weather',
  description: 'Give current weather along with 3 day forecast.',
  use: 'weather <location>',
  aliases: [],
};

const getDayForecastStrings = result => {
  const [
    {
      location: { degreetype },
      current: { temperature, skytext, feelslike, winddisplay: wind, humidity },
      forecast,
    },
  ] = result;
  const forecasts = [];
  for (let i = 1; i < 5; i++) {
    const { skytextday, high, low } = forecast[i];
    let str = '';
    if (i === 1) {
      str += `${temperature}° ${degreetype} - ${skytext}  ${getEmote(
        skytext,
      )}\nFeels Like: ${feelslike}° ${degreetype}\nWinds: ${wind}\nHumidity: ${humidity}%\n`;
    } else {
      str += `${skytextday}  ${getEmote(skytextday)}\n`;
    }
    str += `High: ${high}°${degreetype}\nLow: ${low}° ${degreetype}`;
    forecasts.push(str);
  }
  return forecasts;
};

const getEmote = str => {
  switch (str.toLowerCase()) {
    case 'breezy':
      return ':cloud_tornado:';
    case 'sunny':
      return ':sunny:';
    case 'clear':
      return ':sunny:';
    case 'scattered thunderstorms':
      return ':thunder_cloud_rain:';
    case 'partly sunny':
      return ':white_sun_small_cloud:';
    case 'mostly sunny':
      return ':white_sun_small_cloud:';
    case 'mostly clear':
      return ':white_sun_small_cloud:';
    case 'partly cloudy':
      return ':white_sun_small_cloud:';
    case 'mostly cloudy':
      return ':white_sun_cloud:';
    case 'cloudy':
      return ':cloud:';
    case 'rain':
      return ':cloud_rain:';
    case 'scattered showers':
      return ':cloud_rain:';
    case 'rain and snow':
      return ':cloud_snow:';
    case 'snow':
      return ':cloud_snow:';
    case 'snow showers':
      return ':cloud_snow:';
    case 'thunderstorms':
      return ':thunder_cloud_rain:';
    default:
      return `no emote for ${str}`;
  }
};
