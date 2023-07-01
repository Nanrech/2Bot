const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const memberModel = require('../schemas/member');
const { getLevel } = require('../common');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Displays the top 15 biggest nerds'),
	async execute(interaction) {
		// OLD: Leaderboard shenanigans
		// NEW: Here lie my hopes and dreams of making a better looking leaderboard embed. I was bested by JS' unrelenting bullshit.
		const topMembers = await memberModel
			.find()
			.sort({ xp: -1 })
			.limit(15);
		if (!topMembers) return interaction.reply('Couldn\'t get rank. Do you have any XP?');

		let usernames = '';
		let levels = '';
		let xp = '';

		for (let i = 0; i != 15; i++) {
			// https://stackoverflow.com/questions/60607341/displaying-leaderboard-in-embed
			usernames += `\`${(i + 1).toString().padStart(2, '0')}\` <@${topMembers[i].id}>\n`;
			levels += `\`${getLevel(topMembers[i].xp)}\`\n`;
			xp += `\`${topMembers[i].xp.toLocaleString('en-us')}\`\n`;
		}

		usernames = usernames
			.replace('`01`', '`🏆`')
			.replace('`02`', '`🥈`')
			.replace('`03`', '`🥉`');

		const leaderboardEmbed = new EmbedBuilder()
			.setColor(0xED4245)
			.setTimestamp(Date.now())
			.addFields(
				{ name: 'Top 15 members', value: usernames, inline: true },
				{ name: 'Level', value: levels, inline: true },
				{ name: 'XP', value: xp, inline: true },
			);

		interaction.reply({ embeds: [leaderboardEmbed] });
	},
};
