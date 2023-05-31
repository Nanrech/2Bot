const { ROLES, CHANNELS } = require('../common');


module.exports = {
	name: 'messageReactionRemove',
	once: false,
	async execute(reaction, user) {
		if (reaction.message.channel.id != CHANNELS.reaction_roles) return;
		if (reaction.partial) {
			try {
				reaction.fetch();
			}
			catch (error) {
				return;
			}
		}

		switch (reaction.emoji.name) {
		case 'giveaway':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.giveaways);
			break;
		case '🎮':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.events);
			break;
		case 'shrug':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.qotd);
			break;
		case 'Ok':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.streams);
			break;
		case 'youtube':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.youtube);
			break;
		case '🍿':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.movie);
			break;
		case 'catdance':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.podcast);
			break;
		case 'Clap':
			await reaction.message.guild.members.cache.get(user.id).roles.remove(ROLES.fotd);
			break;

		default:
			console.log(`Unknown reaction ${reaction.emoji.name}`);
			return;
		}
	},
};
