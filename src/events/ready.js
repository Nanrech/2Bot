const cachedRoles = require('../role-cache.json');
const mongo = require('../mongo');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('[IMPORTANT] Connection to Discord established');
		mongo().catch(error => {console.error(error);});
		const roles = client.guilds.cache.get('707341019275853847').roles.cache;
		const roleEnum = {
			verifyRole: roles.get(cachedRoles.verifyRole),
			levels: {
				role100: roles.get(cachedRoles.levels.role100),
				role90: roles.get(cachedRoles.levels.role90),
				role80: roles.get(cachedRoles.levels.role80),
				role70: roles.get(cachedRoles.levels.role70),
				role60: roles.get(cachedRoles.levels.role60),
				role50: roles.get(cachedRoles.levels.role50),
				role40: roles.get(cachedRoles.levels.role40),
				role30: roles.get(cachedRoles.levels.role30),
				role20: roles.get(cachedRoles.levels.role20),
				role15: roles.get(cachedRoles.levels.role15),
				role10: roles.get(cachedRoles.levels.role10),
				role5: roles.get(cachedRoles.levels.role5),
				role1: roles.get(cachedRoles.levels.role1),
			},
			reactions: {
				giveawaysRole: roles.get(cachedRoles.reactions.giveawaysRole),
				eventsRole: roles.get(cachedRoles.reactions.eventsRole),
				qotdRole: roles.get(cachedRoles.reactions.qotdRole),
				streamsRole: roles.get(cachedRoles.reactions.streamsRole),
				youtubeRole: roles.get(cachedRoles.reactions.youtubeRole),
				movieNightRole: roles.get(cachedRoles.reactions.movieNightRole),
				pogcastRole: roles.get(cachedRoles.reactions.pogcastRole),
				fotdRole: roles.get(cachedRoles.reactions.fotdRole),
			},
		};
		roleEnum.returnLRole = function(l) {
			switch (l) {
			case 100:
				return roleEnum.levels.role100;
			case 90:
				return roleEnum.levels.role90;
			case 80:
				return roleEnum.levels.role80;
			case 70:
				return roleEnum.levels.role70;
			case 60:
				return roleEnum.levels.role60;
			case 50:
				return roleEnum.levels.role50;
			case 40:
				return roleEnum.levels.role40;
			case 30:
				return roleEnum.levels.role30;
			case 20:
				return roleEnum.levels.role20;
			case 15:
				return roleEnum.levels.role15;
			case 10:
				return roleEnum.levels.role10;
			case 5:
				return roleEnum.levels.role5;
			case 1:
				return roleEnum.levels.role1;
			}
		};
		module.exports.roleEnum = roleEnum;
		console.log('[IMPORTANT] Roles ready');
	},
};
