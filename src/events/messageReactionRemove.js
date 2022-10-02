const { reactRolesChannel } = require('../config.json');
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
		if (reaction.message.channel.id == reactRolesChannel) {
			reaction.message.guild.members.fetch(user.id).then(member => {
				switch (reaction.emoji.name) {
				case 'giveaway':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.giveawaysRole.id)) {return;}
					member.roles.remove(rE.roleEnum.reactions.giveawaysRole);
					break;
				case '🎮':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.eventsRole.id)) {return;}
					member.roles.remove(rE.roleEnum.reactions.eventsRole);
					break;
				case 'shrug':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.qotdRole.id)) {return;}
					member.roles.remove(rE.roleEnum.reactions.qotdRole);
					break;
				case 'Ok':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.streamsRole.id)) {return;}
					member.roles.remove(rE.roleEnum.reactions.streamsRole);
					break;
				case 'youtube':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.youtubeRole.id)) {return;}
					member.roles.remove(rE.roleEnum.reactions.youtubeRole);
					break;
				case '🍿':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.movieNightRole.id)) {return;}
					user.roles.remove(rE.roleEnum.reactions.movieNightRole);
					break;
				case 'catdance':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.pogcastRole.id)) {return;}
					member.roles.remove(rE.roleEnum.reactions.pogcastRole);
					break;
				case 'Clap':
					if (!member.roles.cache.some(role => role.id == rE.roleEnum.reactions.pogcastRole.id)) {return;}
					member.roles.remove(rE.roleEnum.reactions.fotdRole);
					break;
				}
			});
		}
	} };
