// Full credit to Hoss for this bit of code. None of this belongs to me (Nan).

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

module.exports.convertMs = convertMs;
module.exports.getReqXP = getReqXP;
