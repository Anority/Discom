import './init-config';
import cheerio from 'cheerio';
import Cleverbot from 'cleverbot';
import Discordie from 'discordie';
import nconf from 'nconf';
import R from 'ramda';
import rp from 'request-promise';
import startExpress from './express';
const client = new Discordie();
let clever = new Cleverbot({
  key: nconf.get('CLEVERBOT')
});
const commands = {
  chat: {
    process: function(client, evt, suffix) {
      if (!nconf.get('CLEVERBOT')) return;
      if (!suffix) suffix = 'Hello.';
      evt.message.channel.sendTyping();
      clever.query(suffix).then((response) => {
        evt.message.channel.sendMessage(response.output);
      });
    }
  }
};
client.Dispatcher.on('MESSAGE_CREATE', (evt) => {
  if (!evt.message) return;
  if (evt.message.content[0] === '!') {
    const command = evt.message.content.toLowerCase().split(' ')[0].substring(1);
    const suffix = evt.message.content.substring(command.length + 2);
    const cmd = commands[command];
    if (cmd) return cmd.process(client, evt, suffix);
    return;
  }
  if (!nconf.get('TWITTER_ONE') || !nconf.get('TWITTER_TWO')) {
    return;
  } else {
    if (evt.message.channel.id === nconf.get('TWITTER_ONE') || evt.message.channel.id === nconf.get('TWITTER_TWO')) {
      if (evt.message.content[0] === 'R' && evt.message.content[1] === 'T' || evt.message.content[0] === '@') {
        evt.message.delete();
        return;
      }
    }
  }
});
client.Dispatcher.on('GATEWAY_READY', () => {
  startExpress();
  setTimeout(() => {
    if (!nconf.get('ALMANAX')) {
      return;
    } else {
      setInterval(() => {
        client.Channels.find(channel => channel.id === nconf.get('ALMANAX')).fetchMessages().then(messages => {
          let text = '';
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          if (month < 10) month = `0${month}`;
          if (day < 10) day = `0${day}`;
          let dat = `${year}-${month}-${day}`;
          if (messages.messages[0]) {
            let datt = messages.messages[0].content[12] + messages.messages[0].content[13];
            if (datt.toString() !== day.toString()) {
              messages.messages[0].delete();
              let options = {
                uri: 'http://www.krosmoz.com/en/almanax',
                encoding: 'utf8',
                transform: (body) => {
                  return cheerio.load(body);
                }
              };
              rp(options).then(($) => {
                let questen = $('#achievement_dofus .mid .more .more-infos p').first().text().trim();
                let offeren = $('#achievement_dofus .mid .more .more-infos .more-infos-content .fleft').first().text().trim();
                let mainen = $('#achievement_dofus .mid').first().children().remove('div.more').end().text().trim();
                let bonusen = $('#achievement_dofus .mid .more').first().children().remove('div.more-infos').end().text().trim();
                text += `__**${dat}**__\n\n**${mainen}**\n${bonusen}\n\n**${questen}**\n${offeren}`;
                let options = {
                  uri: 'http://www.krosmoz.com/fr/almanax',
                  encoding: 'utf8',
                  transform: (body) => {
                    return cheerio.load(body);
                  }
                };
                rp(options).then(($) => {
                  let questfr = $('#achievement_dofus .mid .more .more-infos p').first().text().trim();
                  let offerfr = $('#achievement_dofus .mid .more .more-infos .more-infos-content .fleft').first().text().trim();
                  let image = $('#achievement_dofus .mid .more .more-infos .more-infos-content img').attr('src');
                  let mainfr = $('#achievement_dofus .mid').first().children().remove('div.more').end().text().trim();
                  let bonusfr = $('#achievement_dofus .mid .more').first().children().remove('div.more-infos').end().text().trim();
                  text += `\n\n\n**${mainfr}**\n${bonusfr}\n\n**${questfr}**\n${offerfr}\n\n${image}`;
                  return client.Channels.find(channel => channel.id === nconf.get('ALMANAX')).sendMessage(text);
                }).catch((err) => {
                  return console.log(err);
                });
              }).catch((err) => {
                return console.log(err);
              });
            } else {
              return;
            }
          } else {
            let options = {
              uri: 'http://www.krosmoz.com/en/almanax',
              encoding: 'utf8',
              transform: (body) => {
                return cheerio.load(body);
              }
            };
            rp(options).then(($) => {
              let questen = $('#achievement_dofus .mid .more .more-infos p').first().text().trim();
              let offeren = $('#achievement_dofus .mid .more .more-infos .more-infos-content .fleft').first().text().trim();
              let mainen = $('#achievement_dofus .mid').first().children().remove('div.more').end().text().trim();
              let bonusen = $('#achievement_dofus .mid .more').first().children().remove('div.more-infos').end().text().trim();
              text += `__**${dat}**__\n\n**${mainen}**\n${bonusen}\n\n**${questen}**\n${offeren}`;
              let options = {
                uri: 'http://www.krosmoz.com/fr/almanax',
                encoding: 'utf8',
                transform: (body) => {
                  return cheerio.load(body);
                }
              };
              rp(options).then(($) => {
                let questfr = $('#achievement_dofus .mid .more .more-infos p').first().text().trim();
                let offerfr = $('#achievement_dofus .mid .more .more-infos .more-infos-content .fleft').first().text().trim();
                let image = $('#achievement_dofus .mid .more .more-infos .more-infos-content img').attr('src');
                let mainfr = $('#achievement_dofus .mid').first().children().remove('div.more').end().text().trim();
                let bonusfr = $('#achievement_dofus .mid .more').first().children().remove('div.more-infos').end().text().trim();
                text += `\n\n\n**${mainfr}**\n${bonusfr}\n\n**${questfr}**\n${offerfr}\n\n${image}`;
                return client.Channels.find(channel => channel.id === nconf.get('ALMANAX')).sendMessage(text);
              }).catch((err) => {
                return console.log(err);
              });
            }).catch((err) => {
              return console.log(err);
            });
          }
        });
      }, 600000);  // 600000 = 10 minutes
    }
  }, 3000);
  setTimeout(() => {
    if (!nconf.get('STREAMING_ROLE')) {
      return;
    } else if (!nconf.get('STREAMER_ROLE')) {
      client.Users.fetchMembers();
      setInterval(() => {
        R.forEach(user => {
          if (user.hasRole(nconf.get('STREAMING_ROLE')) === true && user.game !== null) {
            if (user.game.type === 1) {
              return; // ROLE, GAME, STREAM
            } else {
              user.unassignRole(nconf.get('STREAMING_ROLE'));
              return; // ROLE, GAME, NO STREAM
            }
          } else if (user.hasRole(nconf.get('STREAMING_ROLE')) !== true && user.game !== null) {
            if (user.game.type === 1) {
              user.assignRole(nconf.get('STREAM_ROLE'));
              return; // NO ROLE, GAME, STREAM
            } else {
              return; // NO ROLE, GAME, NO STREAM
            }
          } else if (user.hasRole(nconf.get('STREAMING_ROLE')) === true && user.game === null) {
            user.unassignRole(nconf.get('STREAMING_ROLE'));
            return; // ROLE, NO GAME
          } else if (user.hasRole(nconf.get('STREAMING_ROLE')) !== true && user.game === null) {
            return; // NO ROLE, NO GAME
          };
        }, client.Users);
      }, 60000); // 60000 = 1 minute
    } else {
      setInterval(() => {
        R.forEach(user => {
          if (user.hasRole(nconf.get('STREAMER_ROLE'))) {
            if (user.hasRole(nconf.get('STREAMING_ROLE')) === true && user.game !== null) {
              if (user.game.type === 1) {
                return; // ROLE, GAME, STREAM
              } else {
                user.unassignRole(nconf.get('STREAMING_ROLE'));
                return; // ROLE, GAME, NO STREAM
              }
            } else if (user.hasRole(nconf.get('STREAMING_ROLE')) !== true && user.game !== null) {
              if (user.game.type === 1) {
                user.assignRole(nconf.get('STREAMING_ROLE'));
                return; // NO ROLE, GAME, STREAM
              } else {
                return; // NO ROLE, GAME, NO STREAM
              }
            } else if (user.hasRole(nconf.get('STREAMING_ROLE')) === true && user.game === null) {
              user.unassignRole(nconf.get('STREAMING_ROLE'));
              return; // ROLE, NO GAME
            } else if (user.hasRole(nconf.get('STREAMING_ROLE')) !== true && user.game === null) {
              return; // NO ROLE, NO GAME
            };
          } else {
            return;
          }
        }, client.Users);
      }, 60000); // 60000 = 1 minute
    }
  }, 6000);
});
client.Dispatcher.on('DISCONNECTED', () => {
  console.log('Disconnected');
  setTimeout(() => {
    client.connect({token: nconf.get('TOKEN')});
  }, 2000);
});
client.connect({token: nconf.get('TOKEN')});
