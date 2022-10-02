const { reactRolesChannel, verifyChannel } = require('../config.json');
const rE = require('./ready');
module.exports = {
	name: 'messageReactionAdd',
	once: false,
	execute(reaction, user) {
		if (user.bot) {return;}
		if (reaction.partial) {
			try {
				reaction.fetch();
			}
			catch (error) {
				return;
			}
		}
		if (reaction.message.channel.id == verifyChannel) {
			reaction.message.guild.members.fetch(user.id).then(member => {
				console.log(`[IMPORTANT] Verified ${member}`);
				member.roles.add(rE.roleEnum.verifyRole.id);
				return;
			});
		}
		if (reaction.message.channel.id == reactRolesChannel) {
			reaction.message.guild.members.fetch(user.id).then(member => {
				switch (reaction.emoji.name) {
				case 'giveaway':
					member.roles.add(rE.roleEnum.reactions.giveawaysRole);
					break;
				case '🎮':
					member.roles.add(rE.roleEnum.reactions.eventsRole);
					break;
				case 'shrug':
					member.roles.add(rE.roleEnum.reactions.qotdRole);
					break;
				case 'Ok':
					member.roles.add(rE.roleEnum.reactions.streamsRole);
					break;
				case 'youtube':
					member.roles.add(rE.roleEnum.reactions.youtubeRole);
					break;
				case '🍿':
					user.roles.add(rE.roleEnum.reactions.movieNightRole);
					break;
				case 'catdance':
					member.roles.add(rE.roleEnum.reactions.pogcastRole);
					break;
				case 'Clap':
					member.roles.add(rE.roleEnum.reactions.fotdRole);
					break;
				}
			});
		}
	} };
