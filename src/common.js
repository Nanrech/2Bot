const ROLES = {
	verified: '727884232743059486',

	level1: '714451068620374096',
	level5: '727890797436862525',
	level10: '714451075041853460',
	level15: '714450876898738257',
	level20: '714450587017543752',
	level30: '714450460295299143',
	level40: '727891875771711496',
	level50: '714449828196909179',
	level60: '735175002369818654',
	level70: '735138236334211184',
	level80: '847134278839566347',
	level90: '881867566132383755',
	level100: '881867773146456064',

	giveaways: '713936159847481384',
	events: '713881124660576338',
	qotd: '722488491681906769',
	streams: '740214312773091382',
	youtube: '740213876989100052',
	movie: '746116590600454155',
	podcast: '822916603309195264',
	fotd: '871443183337340978',

};

const XP_ROLES = {
	level0: 0,
	level1: 300,
	level5: 3750,
	level10: 15000,
	level15: 33750,
	level20: 60000,
	level30: 135000,
	level40: 240000,
	level50: 375000,
	level60: 540000,
	level70: 735000,
	level80: 960000,
	level90: 1215000,
	level100: 1500000,
};

const CHANNELS = {
	verify: '883353164563230731',
	reaction_roles: '815346222549827645',
};

function getLevel(xp) {
	if (xp < 300) return 0;
	return Math.floor(Math.sqrt(xp / 37.5) / 2);
}

function getReqXP(l) {
	return (150 * (Math.pow(l, 2) + l));
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

module.exports = { ROLES, CHANNELS, XP_ROLES, getLevel, getReqXP, assignLevelRole, findNewLevelRole };
