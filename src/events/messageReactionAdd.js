const { ROLES, CHANNELS } = require('../common');


module.exports = {
	name: 'messageReactionAdd',
	once: false,
	async execute(reaction, user) {
		if (reaction.partial) {
			try {
				reaction.fetch();
			}
			catch (error) {
				return;
			}
		}

		if (reaction.message.channel.id == CHANNELS.verify) {
			await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.verified);
			return;
		}

		else if (reaction.message.channel.id == CHANNELS.reaction_roles) {
			switch (reaction.emoji.name) {
			case 'giveaway':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.giveaways);
				break;
			case '🎮':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.events);
				break;
			case 'shrug':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.qotd);
				break;
			case 'Ok':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.streams);
				break;
			case 'youtube':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.youtube);
				break;
			case '🍿':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.movie);
				break;
			case 'catdance':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.podcast);
				break;
			case 'Clap':
				await reaction.message.guild.members.cache.get(user.id).roles.add(ROLES.fotd);
				break;

			default:
				console.log(`Unknown reaction ${reaction.emoji.name}`);
				return;
			}
		}
	},
};
