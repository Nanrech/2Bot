const memberSchema = require('../schemas/member');
const { CHANNELS, ROLES } = require('../enums');

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

		// if (msg.guildId != '707341019275853847') return;

		const member_id = msg.author.id;

		if (timeMap.has(member_id)) {
			// Small cooldown to prevent spam. __Shouldn't__ be noticeable

			const lastTimestamp = timeMap.get(member_id);
			const diff = msg.createdTimestamp - lastTimestamp;

			if (diff < 3000) return;

			const xpToAdd = Math.round((baseXP + Math.random() * baseXP) + baseXP * 1 - baseXP);

			try {
				const updatedMember = await memberSchema.findOneAndUpdate({ id: member_id }, { $inc: { xp: xpToAdd } }, { upsert: true, new: true });
				const lastLevel = getLevel(updatedMember.xp - xpToAdd);
				const newLevel = getLevel(updatedMember.xp);

				if (lastLevel < newLevel) msg.react('🎉');

				if (assignLevelRole(newLevel)) {
					if (msg.member.roles) {
						msg.member.roles.add(findNewLevelRole(newLevel));
					}
					else {
						const member = msg.guild.members.fetch(member_id);
						member.roles.add(findNewLevelRole(newLevel));
					}
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

		if (msg_counter > 299) {
			timeMap.clear();
			msg_counter = 0;
		}
	},
};

function getLevel(xp) {
	if (xp < 300) return 0;
	return Math.floor((-1 + Math.sqrt((xp / 37.5) + 1)) / 2) + 1;
}

function assignLevelRole(level) {
	return [1, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100].includes(level);
}

function findNewLevelRole(level) {
	switch (level) {
	case 1:
		return ROLES.level1;
	case 5:
		return ROLES.level5;
	case 10:
		return ROLES.level10;
	case 15:
		return ROLES.level15;
	case 20:
		return ROLES.level20;
	case 30:
		return ROLES.level30;
	case 40:
		return ROLES.level40;
	case 50:
		return ROLES.level50;
	case 60:
		return ROLES.level60;
	case 70:
		return ROLES.level70;
	case 80:
		return ROLES.level80;
	case 90:
		return ROLES.level90;
	case 100:
		return ROLES.level100;
	default:
		return ROLES.level1;
	}
}