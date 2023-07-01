const fs = require('fs');
const { mongoose } = require('mongoose');
const { mongoURL } = require('../src/config.json');
const memberModel = require('../src/schemas/member');


mongoose.connect(mongoURL, { keepAlive: false });
mongoose.set('strictQuery', true);

// Array with all role IDs from level 5 to level 100, we'll use this later
const rolesArr = [
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
];

// How much XP per level role
const XP_ROLES = {
	level0: 0,
	level1: getReqXP(1),
	level5: getReqXP(5),
	level10: getReqXP(10),
	level15: getReqXP(15),
	level20: getReqXP(20),
	level30: getReqXP(30),
	level40: getReqXP(40),
	level50: getReqXP(50),
	level60: getReqXP(60),
	level70: getReqXP(70),
	level80: getReqXP(80),
	level90: getReqXP(90),
	level100: getReqXP(100),
};

// Self explanatory function
function getLevel(xp) {
	if (xp < 300) return 0;
	return Math.floor(Math.sqrt(xp / 37.5) / 2);
}
function getReqXP(l) {
	return (150 * (Math.pow(l, 2) + l));
}

/*

Previously, through a slash command, I got *all* server members
through discord and stored their ID alongside their roles' IDs
and stored them in members_fetch.json. It looks something like this

{
    "452954731162238987": [
        "x",
        "y",
        "z",
        ...
    ],
    ...
}

Getting these was easy, I used
interaction.guild.members.fetch() to get all of them in an array
& then write them to a file accordingly. We load these into memory now.

*/

// Replace with your own paths if you wanna do this
const members_fetch_json = '';
const docs_json = '';
const members = JSON.parse(
	fs.readFileSync(
		members_fetch_json,
		{ encoding: 'utf8', flag: 'r' },
	),
);

// Now we filter them
for (const key in members) {
	// If the member has no roles they get sent to the shadow realm
	if (members[key].length == 0) {
		delete members[key];
		continue;
	}
	else {
		// del = Does the member have at least one level role?
		const del = members[key].some(r => rolesArr.includes(r));

		// Ya-yeet if not
		if (!del) {
			delete members[key];
		}

		// Remove all non-level roles if yes
		else {
			for (let i = members[key].length - 1; i >= 0; i--) {
				if (!rolesArr.includes(members[key][i])) {
					members[key].splice(i, 1);
				}
			}
		}
	}
}

// We keep only the members who are above level 5, might as well log how many there are
console.log('There are', Object.keys(members).length, 'members above level 5');

// Now we figure out what level they're supposed to be
const memberLevels = new Object();

// Addendum: Ignore this shit, I was tired.
for (const key in members) {
	if (members[key].includes('881867773146456064')) {
		memberLevels[key] = 100;
	}
	else if (members[key].includes('881867566132383755')) {
		memberLevels[key] = 90;
	}
	else if (members[key].includes('847134278839566347')) {
		memberLevels[key] = 80;
	}
	else if (members[key].includes('735138236334211184')) {
		memberLevels[key] = 70;
	}
	else if (members[key].includes('735175002369818654')) {
		memberLevels[key] = 60;
	}
	else if (members[key].includes('714449828196909179')) {
		memberLevels[key] = 50;
	}
	else if (members[key].includes('727891875771711496')) {
		memberLevels[key] = 40;
	}
	else if (members[key].includes('714450460295299143')) {
		memberLevels[key] = 30;
	}
	else if (members[key].includes('714450587017543752')) {
		memberLevels[key] = 20;
	}
	else if (members[key].includes('714450876898738257')) {
		memberLevels[key] = 15;
	}
	else if (members[key].includes('714451075041853460')) {
		memberLevels[key] = 10;
	}
	else if (members[key].includes('727890797436862525')) {
		memberLevels[key] = 5;
	}
}

// We know now what level each of these nerds is supposed to be
// Time to find out what level they are in the DB
memberModel.find({
	id: { $in:
		Object.keys(members),
	},
}).exec(function(err, docs) {
	if (err) {console.error(err);}
	fs.writeFileSync(docs_json, JSON.stringify(docs));
});

/*
Presto. We got it. I wrote it to a json to make my life easier now.
Mongo docs (what we wrote to the json) look something like this

{
    _id: ObjectId("blablablablabla"),
    id: "452954731162238987",
    xp: "1500000"
}

We only need ID and XP so I made this quick python script to do just that

```py
import json

fixed = {}
with open("docs.json", "r") as f:
    raw = json.load(f)

for i in raw:
	# raw is an array like [{_id: x, id: y, xp: z}, ...], we want {id: xp, id: xp...}
    fixed[i["id"]] = i["xp"]

with open("docs.json", "w") as f:
    json.dump(fixed, f, indent=2)
```
*/

// We load up this, now clean and tidy, JSON with user IDs and XP
const memberXP = JSON.parse(
	fs.readFileSync(
		'docs.json',
		{ encoding: 'utf8', flag: 'r' },
	),
);

// And go nuts
// Addendum 2: I was still tired
for (const key in memberXP) {
	// member_level = What level is this nerd in the DB?
	const member_level = getLevel(memberXP[key]);

	// Is their highest level role higher than the level they actually have?
	if (memberLevels[key] > member_level) {
		switch (memberLevels[key]) {
		// Imagine there's another tab before each of the following lines. Linter being weird.
		case 100:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level100 },
			).exec();
			break;
		case 90:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level90 },
			).exec();
			break;
		case 80:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level80 },
			).exec();
			break;
		case 70:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level70 },
			).exec();
			break;
		case 60:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level60 },
			).exec();
			break;
		case 50:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level50 },
			).exec();
			break;
		case 40:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level40 },
			).exec();
			break;
		case 30:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level30 },
			).exec();
			break;
		case 20:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level20 },
			).exec();
			break;
		case 15:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level15 },
			).exec();
			break;
		case 10:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level15 },
			).exec();
			break;
		case 5:
			memberModel.findOneAndUpdate(
				{ id: key },
				{ xp: XP_ROLES.level5 },
			).exec();
			break;
		default:
			break;
		}
	}
}
console.log('We\'re done!');
