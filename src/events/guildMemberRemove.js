const { getLevel } = require('../functions');
const memberSchema = require('../schemas/member-schema');
const { addXP } = require('./messageCreate');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(member) {
		console.log('someone left');
		// I don't know if this works, probably not.
		// It's supposed to remove the person who left
		// from the DB and send a message in logs about it with their XP & level
		addXP(member.id, 0).then(final => {
			member.client.channels.cache.get('832303064513380373').send(`${member} left. XP & level at the time of death: ${final.xp}xp, lvl ${getLevel(final.xp)}`);
			memberSchema.findOneAndRemove(String(member.id));
		});
	},
};
