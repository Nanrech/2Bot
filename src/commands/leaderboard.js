const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const memberModel = require('../schemas/member');
const { getLevel } = require('../common');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Displays the top 10 biggest nerds'),
	async execute(interaction) {
		const topMembers = await memberModel
			.find()
			.sort({ xp: -1 })
			.limit(10);

		if (!topMembers) return interaction.reply('Error fetching leaderboard from database');

		const leaderboardFields = new Array;
		const leaderboardEmbed = new EmbedBuilder()
			.setTitle('Top 10 nerds')
			.setColor(0xED4245)
			.setTimestamp(Date.now());

		for (let i = 0; i != 10; i++) {
			const username = await interaction.client.users.fetch(topMembers[i].id, true);
			leaderboardFields.push(
				{
					name: `#${i + 1} ${username.displayName}`, value: `\`lvl ${getLevel(topMembers[i].xp)}\` (${topMembers[i].xp.toLocaleString('en-us')})`, inline: true,
				},
			);
		}

		let fieldCount = 0;

		for (let i = 0; i != 10; i++) {

			if (fieldCount == 2) {
				fieldCount = 0;
				leaderboardEmbed.addFields(
					{ name: '\u200b', value: '\u200b', inline: true },
				);
			}

			leaderboardEmbed.addFields(leaderboardFields[i]);
			fieldCount += 1;

			if (i == 9) {
				// Looks weird otherwise
				leaderboardEmbed.addFields(
					{ name: '\u200b', value: '\u200b', inline: true },
				);
			}
		}

		interaction.reply({ embeds: [leaderboardEmbed] });
	},
};
