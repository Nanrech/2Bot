// convertMs belongs to Hoss

const convertMs = (s) => {
	const ms = s % 1000;
	s = (s - ms) / 1000;
	const secs = s % 60;
	s = (s - secs) / 60;
	const mins = s % 60;
	const hrs = (s - mins) / 60;

	if (hrs > 0) {
		if (mins == 0) {
			return `${hrs}hr`;
		}
		else {
			return `${hrs}hr ${mins}min`;
		}
	}
	else if (mins > 0) {
		if (secs == 0) {
			return `${mins}min`;
		}
		else {
			return `${mins}min ${secs}sec`;
		}
	}
	else if (secs == 0) {
		return `${Math.round((ms / 1000) * 10) / 10}sec`;
	}
	else {
		return `${secs}sec`;
	}
};
const getReqXP = (l) => {
	return (150 * (Math.pow(l, 2) + l));
};
const getLevel = (xp) => {
	const XP = Number(xp);
	if (XP < 300) {return 0;}
	return Math.floor((-1 + Math.sqrt((XP / 37.5) + 1)) / 2) + 1;
};
const assignLevelRole = (l) => {
	switch (parseInt(l)) {
	case 1:
		return true;
	case 5:
		return true;
	case 10:
		return true;
	case 15:
		return true;
	case 20:
		return true;
	case 30:
		return true;
	case 40:
		return true;
	case 50:
		return true;
	case 60:
		return true;
	case 70:
		return true;
	case 80:
		return true;
	case 90:
		return true;
	case 100:
		return true;
	default:
		return false;
	}
};

module.exports.convertMs = convertMs;
module.exports.getReqXP = getReqXP;
module.exports.getLevel = getLevel;
module.exports.assignLevelRole = assignLevelRole;
