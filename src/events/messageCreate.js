const mongo = require('../mongo');
const memberSchema = require('../schemas/member-schema');
const { baseXP, multiplier } = require('../config-xp.json');
const { getReqXP } = require('../functions');
const msgTDManager = new Map();

let msgCounter = 0;
let cleanUpCasualties = 0;

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(msg) {

		if (msg.author.bot) {
			return;
		}

		if (msg.channel.id == '825071517733748786') {
			msg.react('✅');
			msg.react('❎');
		}
		if (msgTDManager.has(msg.author.id)) {
			const data = msgTDManager.get(msg.author.id);
			const diff = msg.createdTimestamp - data.lastmsgTimestamp;
			if (diff >= 5000) {
				msgCounter++;
				data.lastmsgTimestamp = msg.createdTimestamp;
				msgTDManager.set(msg.author.id, data);
				const xp = Math.round((baseXP + Math.random() * baseXP) + baseXP * multiplier - baseXP);
				addXP(msg.author.id, xp).then(final => {
					console.log(`Gave ${xp} XP to ${msg.author.username}. Current XP: ${final.xp}`);
					if (final.xp >= getReqXP(final.level)) {
						setLevel(msg.author.id, final.level + 1);
						console.log(`${msg.author.username} level up ${final.level} --> ${final.level + 1}`);
						msg.react('🎉');
					}
				});
			}
			else {
				return;
			}
		}
		else {
			msgTDManager.set(msg.author.id, {
				lastmsgTimestamp: msg.createdTimestamp,
			});
		}

		// Everyone's favourite part, memory cleanup time!
		if (msgCounter > 15) {
			console.log('Cleaning time . . .');
			msgCounter = 0;
			cleanUpCasualties = 0;
			msgTDManager.forEach((value, key) => {
				if ((msg.createdTimestamp - value.lastmsgTimestamp) > 40000) {
					cleanUpCasualties++;
					msgTDManager.delete(key);
				}
			});
			console.log(`. . . Cleaned up ${cleanUpCasualties} values from local memory`);
		}

	},
};

async function addXP(id, xpToAdd) {
	let final;
	await mongo().then(async (mongoose) => {
		try {
			const result = await memberSchema.findOneAndUpdate({
				id,
			},
			{
				id,
				$inc: {
					xp: xpToAdd,
				},
			},
			{
				upsert: true,
				new: true,
			});
			final = result;
		}
		finally {
			mongoose.connection.close();
		}
	});
	return final;
}

const setLevel = async (id, level) => {
	let final;
	await mongo().then(async (mongoose) => {
		try {
			const result = await memberSchema.findOneAndUpdate({
				id,
			},
			{
				id,
				level: level,
			},
			{
				upsert: true,
				new: true,
			});
			final = result;
		}
		finally {mongoose.connection.close();}
	});
	return final;
};

module.exports.addXP = addXP;
module.exports.setLevel = setLevel;
