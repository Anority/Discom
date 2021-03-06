import './init-config';
import cheerio from 'cheerio';
import Cleverbot from 'cleverbot';
import Discord from 'discord.js';
import nconf from 'nconf';
import rp from 'request-promise';
import startExpress from './express';
const client = new Discord.Client();
let clever = new Cleverbot({
    key: nconf.get('CLEVERBOT')
});
const cl = [
    'C_ONE',
    'C_TWO',
    'C_THREE',
    'C_FOUR',
    'C_FIVE',
    'C_SIX',
    'C_SEVEN',
    'C_EIGHT'
];
const commands = {
    chat: {
        process: function(client, msg, suffix) {
            if (!nconf.get('CLEVERBOT')) return;
            if (!suffix) suffix = 'Hello.';
            msg.channel.startTyping();
            clever.query(suffix).then((response) => {
                msg.channel.send(response.output);
                msg.channel.stopTyping();
            });
        }
    },
    q: {
        process: function(client, msg, suffix) {
            client.guilds.get(nconf.get('SERVER')).fetchMembers().then(g => {
                if (msg.member.roles.has(nconf.get('ADMIN')) || msg.member.roles.has(nconf.get('MODERATOR'))) {
                    if (suffix > 100) suffix = 100;
                    msg.channel.bulkDelete(suffix);
                } else {
                    return;
                }
            });
        }
    }
};
client.on('ready', () => {
startExpress();
setTimeout(() => {
    if (!nconf.get('ALMANAX')) {
        return;
    } else {
        setInterval(() => {
            client.channels.find(channel => channel.id === nconf.get('ALMANAX')).fetchMessages().then(messages => {
                let text = '';
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                if (month < 10) month = `0${month}`;
                if (day < 10) day = `0${day}`;
                let dat = `${year}-${month}-${day}`;
                if (messages.first()) {
                    let datt = messages.first().content[12] + messages.first().content[13];
                    if (datt.toString() !== day.toString()) {
                        messages.first().delete();
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
                                return client.channels.find(channel => channel.id === nconf.get('ALMANAX')).send(text);
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
                            return client.channels.find(channel => channel.id === nconf.get('ALMANAX')).send(text);
                        }).catch((err) => {
                            return console.log(err);
                        });
                    }).catch((err) => {
                        return console.log(err);
                    });
                }
            });
        }, 600000); // 600000 = 10 minutes
    }
}, 3000);
setTimeout(() => {
        if (!nconf.get('STREAMING_ROLE')) {
            return;
        } else if (nconf.get('STREAMER_ROLE')) {
            setInterval(() => {
                client.guilds.get(nconf.get('SERVER')).fetchMembers().then(g => {
                    g.members.forEach((member) => {
                        if (member.roles.has(nconf.get('STREAMER_ROLE')) === true && member.roles.has(nconf.get('STREAMING_ROLE')) !== true && member.user.presence.game && member.user.presence.game.streaming === true) {
                            member.addRole(nconf.get('STREAMING_ROLE'));
                            return;
                        } else if (member.roles.has(nconf.get('STREAMING_ROLE')) === true) {
                            if (!member.user.presence.game) {
                                member.removeRole(nconf.get('STREAMING_ROLE'));
                                return;
                            } else if (member.user.presence.game && member.user.presence.game.streaming !== true) {
                                member.removeRole(nconf.get('STREAMING_ROLE'));
                                return;
                            } else {
                                return;
                            }
                        } else {
                            return;
                        };
                    });
                });
            }, 60000); // 60000 = 1 minute
        } else {
            setInterval(() => {
                client.guilds.get(nconf.get('SERVER')).fetchMembers().then(g => {
                    g.members.forEach((member) => {
                        if (member.roles.has(nconf.get('STREAMING_ROLE')) !== true && member.user.presence.game && member.user.presence.game.streaming === true) {
                            member.addRole(nconf.get('STREAMING_ROLE'));
                            return;
                        } else if (member.roles.has(nconf.get('STREAMING_ROLE')) === true) {
                            if (!member.user.presence.game) {
                                member.removeRole(nconf.get('STREAMING_ROLE'));
                                return;
                            } else if (member.user.presence.game && member.user.presence.game.streaming !== true) {
                                member.removeRole(nconf.get('STREAMING_ROLE'));
                                return;
                            } else {
                                return;
                            }
                        } else {
                            return;
                        };
                    });
                });
            }, 60000); // 60000 = 1 minute
        }
}, 6000);
/*setTimeout(() => {
        if (!nconf.get('C_ONE')) {
            return;
        } else {
            client.guilds.get(nconf.get('SERVER')).fetchMembers().then(g => {
                var promise = Promise.resolve();
                g.members.forEach((member) => {
                    promise = promise.then(() => {
                        if (member.user.presence.status !== 'offline') {
                            if (member.roles.has(nconf.get('C_ONE')) !== true && member.roles.has(nconf.get('C_TWO')) !== true && member.roles.has(nconf.get('C_THREE')) !== true && member.roles.has(nconf.get('C_FOUR')) !== true && member.roles.has(nconf.get('C_FIVE')) !== true && member.roles.has(nconf.get('C_SIX')) !== true && member.roles.has(nconf.get('C_SEVEN')) !== true && member.roles.has(nconf.get('C_EIGHT')) !== true) {
                                member.addRole(nconf.get(cl[Math.floor(Math.random()*cl.length)]));
                            }
                        } else {
                            return;
                        };
                        return new Promise((resolve) => {
                            setTimeout(resolve, 2000);
                        });
                    });
                });
                promise.then(() => {
                    process.exit(1);
                });
            });
        }
}, 9000);*/
});
/*client.on('presenceUpdate', newMember => {
    if (newMember.roles.has(nconf.get('C_ONE')) !== true && newMember.roles.has(nconf.get('C_TWO')) !== true && newMember.roles.has(nconf.get('C_THREE')) !== true && newMember.roles.has(nconf.get('C_FOUR')) !== true && newMember.roles.has(nconf.get('C_FIVE')) !== true && newMember.roles.has(nconf.get('C_SIX')) !== true && newMember.roles.has(nconf.get('C_SEVEN')) !== true && newMember.roles.has(nconf.get('C_EIGHT')) !== true) {
        newMember.addRole(nconf.get(cl[Math.floor(Math.random()*cl.length)]));
    }
});*/
client.on('message', msg => {
    if (msg.content[0] === '!') {
        const command = msg.content.toLowerCase().split(' ')[0].substring(1);
        const suffix = msg.content.substring(command.length + 2);
        const cmd = commands[command];
        if (cmd) return cmd.process(client, msg, suffix);
        return;
    }
    if (!nconf.get('TWITTER_ONE') || !nconf.get('TWITTER_TWO')) {
        return;
    } else {
        if (msg.channel.id === nconf.get('TWITTER_ONE') || msg.channel.id === nconf.get('TWITTER_TWO')) {
            if (msg.content[0] === 'R' && msg.content[1] === 'T' || msg.content[0] === '@' || msg.content.includes('#DWS') === true) {
                msg.delete();
                return;
            }
        }
    }
});
client.on('disconnected', () => {
    console.log('Disconnected');
    setTimeout(() => {
        client.login(nconf.get('TOKEN'));
    }, 2000);
});
client.login(nconf.get('TOKEN'));
