const mongo = require('../mongo');
const memberSchema = require('../schemas/member-schema');
const { baseXP, multiplier, blacklist } = require('../config-xp.json');
const { assignLevelRole, getLevel } = require('../functions');
const rE = require('./ready');
const msgTDManager = new Map();

let msgCounter = 0;
let cleanUpCasualties = 0;

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(msg) {
		if (msg.author.bot || blacklist.includes(String(msg.channel.id))) {
			return;
		}

		if (msg.channel.id == '825071517733748786') {
			msg.react('✅');
			msg.react('❎');
		}

		if (msgTDManager.has(msg.author.id)) {

			const data = msgTDManager.get(msg.author.id);
			const diff = msg.createdTimestamp - data.lastmsgTimestamp;

			if (diff >= 1) {
				msgCounter++;
				data.lastmsgTimestamp = msg.createdTimestamp;
				msgTDManager.set(msg.author.id, data);

				// XP calculation algorithm;
				const xp = Math.round((baseXP + Math.random() * baseXP) + baseXP * multiplier - baseXP);

				// Add XP to user. Resolve its promise and:
				console.log(`[TRY] Attempting to give XP to ${msg.author.id}`);
				try {
					addXP(msg.author.id, xp).then(final => {

						// Log
						if (!final) {
							console.log('[IMPORTANT] Connection got dropped. Re-starting mongo connection...');
							mongo();
							return;
						}
						console.log(`[SUCCESS] Succesfully gave ${xp} XP to ${msg.author.username}. Current XP: ${final.xp}`);

						const newLevel = getLevel(final.xp);
						if (newLevel != getLevel(final.xp - xp)) {

							console.log(`${msg.author.username} level up ${newLevel} --> ${newLevel}`);
							msg.react('🎉');

							if (assignLevelRole(newLevel)) {
								try {
									msg.member.roles.add(rE.roleEnum.returnLRole(newLevel).id);
								}
								catch (error) {
									console.error(error);
								}
							}
						}
					});
				}
				catch (error) {console.error(error);}
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
		if (msgCounter > 30) {
			console.log('[IMPORTANT] Cleaning time . . .');

			// Reset counter & initiate cleanup + logging;
			msgCounter = 0;
			cleanUpCasualties = 0;

			// Loop through each cached value (message timestamps) & remove ones that may not be used;
			msgTDManager.forEach((value, key) => {
				if ((msg.createdTimestamp - value.lastmsgTimestamp) > 60000) {
					cleanUpCasualties++;
					msgTDManager.delete(key);
				}
			});

			// Log
			console.log(`[IMPORTANT] . . . Cleaned up ${cleanUpCasualties} values from local memory`);
		}

	},
};

async function addXP(id, xpToAdd) {
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
		return result;
	}
	catch (error) {
		console.error(error);
		mongo();
	}
}

module.exports.addXP = addXP;
