const mongo = require('../mongo');
const memberSchema = require('../schemas/member-schema');
const { baseXP, multiplier } = require('../config-xp.json');
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
		if (msg.author.id != '452954731162238987') {
			return;
		}
		if (msgTDManager.has(msg.author.id)) {
			const data = msgTDManager.get(msg.author.id);
			const diff = msg.createdTimestamp - data.lastmsg.createdTimestamp;
			if (diff >= 5000) {
				msgCounter++;
				const xp = Math.round((baseXP + Math.random() * baseXP) + baseXP * multiplier - baseXP);
				data.lastmsg = msg;
				msgTDManager.set(msg.author.id, data);
				// addXP(msg.author.id, xp);
				console.log(`Gave ${xp} XP to ${msg.author.username}`);
			}
			else {
				return;
			}
		}
		else {
			msgTDManager.set(msg.author.id, {
				lastmsg: msg,
			});
		}

		// Everyone's favourite part, memory cleanup time!
		if (msgCounter > 10) {
			console.log('Cleaning time . . .');
			msgCounter = 0;
			cleanUpCasualties = 0;
			msgTDManager.forEach((value, key) => {
				if ((msg.createdTimestamp - value.lastmsg.createdTimestamp) > 31000) {
					cleanUpCasualties++;
					msgTDManager.delete(key);
				}
			});
			console.log(`. . . Cleaned up ${cleanUpCasualties} values from local memory`);
		}

	},
};

const addXP = async (id, xpToAdd) => {
	await mongo().then(async (mongoose) => {
		try {
			await memberSchema.findOneAndUpdate({
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
		}
		finally {mongoose.connection.close();}
	});
};

const setLevel = async (id, level) => {
	await mongo().then(async (mongoose) => {
		try {
			await memberSchema.findOneAndUpdate({
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
		}
		finally {mongoose.connection.close();}
	});
};

module.exports.addXP = addXP;
module.exports.setLevel = setLevel;
