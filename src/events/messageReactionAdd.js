const { reactRolesChannel } = require('../config.json');
const { verifyRole, giveawaysRole, eventsRole, qotdRole, streamsRole, youtubeRole, movieNightRole, pogcastRole, fotdRole } = require('../role-cache.json');

module.exports = {
	name: 'messageReactionCreate',
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
		if (reaction.message.id == '883353164563230731' && !user.roles.includes(verifyRole)) {
			user.roles.add(verifyRole);
			return;
		}

		if (reaction.channel.id == reactRolesChannel) {
			switch (reaction.emoji.name) {

			case 'giveaway':
				user.roles.add(giveawaysRole);
				break;
			case '🎮':
				user.roles.add(eventsRole);
				break;
			case 'shrug':
				user.roles.add(qotdRole);
				break;
			case 'Ok':
				user.roles.add(streamsRole);
				break;
			case 'youtube':
				user.roles.add(youtubeRole);
				break;
			case '🍿':
				user.roles.add(movieNightRole);
				break;
			case 'catdance':
				user.roles.add(pogcastRole);
				break;
			case 'Clap':
				user.roles.add(fotdRole);
				break;
			}
		}
	} };
