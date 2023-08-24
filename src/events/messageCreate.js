const memberModel = require('../schemas/member');
const { CHANNELS, getLevel, assignLevelRole, findNewLevelRole, getRandomInt } = require('../common');

// { member_id: message_timestamp }
const timeMap = new Map();
const baseXP = 60;
let msg_counter = 0;


module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(msg) {
		if (msg.channel.id == CHANNELS.staff_suggestions) {
			msg.react('✅');
			msg.react('❎');
			return;
		}

		if (msg.partial) {
			try {
				msg.fetch();
			}
			catch (error) {
				return;
			}
		}

		if (msg.guildId != '707341019275853847' || msg.author.bot) return;

		const member_id = msg.author.id;

		if (timeMap.has(member_id)) {
			// Small cooldown to prevent spam. __Shouldn't__ be noticeable

			const lastTimestamp = timeMap.get(member_id);
			const diff = msg.createdTimestamp - lastTimestamp;

			if (diff < 3000) return;

			const xpToAdd = Math.round((baseXP + Math.random() * baseXP));

			try {
				const updatedMember = await memberModel.findOneAndUpdate({ id: member_id }, { $inc: { xp: xpToAdd } }, { upsert: true, new: true });
				const lastLevel = getLevel(updatedMember.xp - xpToAdd);
				const newLevel = getLevel(updatedMember.xp);

				if (lastLevel < newLevel) {
					if (getRandomInt(1, 100) == 1) {
						// Easter egg
						msg.react('<a:slug:1124685288074125403>');
					}
					else {
						msg.react('🎉');
					}
				}

				if (assignLevelRole(newLevel)) {
					msg.member.roles.add(findNewLevelRole(newLevel));
				}
			}
			catch (error) {
				console.error(error);
			}
		}
		else {
			msg_counter++;
			timeMap.set(member_id, msg.createdTimestamp);
		}

		if (msg_counter > 700) {
			timeMap.clear();
			msg_counter = 0;
		}
	},
};
