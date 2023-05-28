// "token": "MTAzMTkxODE5NjA2NTg0NTMzMA.GGqo4a.8RLxNXCd8uxc05oC_LoRCQDocIjyqiPEiYVikE",
// "clientId": "1031918196065845330",

const fs = require('fs');
const memberSchema = require('../schemas/member');

const rolesArr = ['727890797436862525', '714451075041853460', '714450876898738257', '714450587017543752', '714450460295299143', '727891875771711496', '714449828196909179', '735175002369818654', '735138236334211184', '847134278839566347', '881867566132383755', '881867773146456064'];

const membersJSONRaw = JSON.parse(
	fs.readFileSync(
		'members_fetch.json',
		{ encoding: 'utf8', flag: 'r' },
	),
);

// This could be done in a different order but this is more or less how my thought process went & it works so it's staying like this
for (const key in membersJSONRaw) {
	// If the member has no roles they get sent to the shadow realm
	if (membersJSONRaw[key].length == 0) {
		delete membersJSONRaw[key];
		continue;
	}
	else {
		// Does the member have at least one level role?
		const del = membersJSONRaw[key].some(r => rolesArr.includes(r));
		if (!del) {
			delete membersJSONRaw[key];
		}
		else {
			// Remove all non-level roles
			for (let i = membersJSONRaw[key].length - 1; i >= 0; i--) {
				if (!rolesArr.includes(membersJSONRaw[key][i])) {
					membersJSONRaw[key].splice(i, 1);
				}
			}
		}
	}
}

console.log(Object.keys(membersJSONRaw).length);
fs.writeFileSync('members_fetch_copy.json', JSON.stringify(membersJSONRaw, null, 2));

/*
function getLevel(xp) {
	if (xp < 300) return 0;
	return Math.floor(Math.sqrt(xp / 37.5) / 2);
}

const arr = [];
for (let i = 0; i < 10000000; i++) {
	const x = getLevel(i);
	if ((x % 10 == 0 || x == 15 || x == 5 || x == 1) && x <= 200) {
		if (!arr.includes(x)) {
			console.log(x, ' ->', i.toLocaleString());
			arr.push(x);
		}
	}
}
console.log(getLevel(1110095));
*/