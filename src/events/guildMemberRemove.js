const { getLevel } = require('../functions');
const memberSchema = require('../schemas/member-schema');
const { addXP } = require('./messageCreate');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(member) {
		console.log('someone left');
		addXP(member.id, 0).then(final => {
			member.client.channels.cache.get('832303064513380373').send(`${member} left. XP & level at the time of death: ${final.xp} -> ${getLevel(final.xp)}`);
			memberSchema.findOneAndRemove(member.id);
		});
	},
};
