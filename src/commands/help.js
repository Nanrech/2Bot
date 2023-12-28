const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows the bot\'s commands'),
	async execute(interaction) {
		const helpEmbed = new EmbedBuilder()
			.setTitle('🆘 Help')
			.setTimestamp(Date.now())
			.addFields(
				{
					name: 'XP',
					value: '/rank · /leaderboard',
					inline: false,
				},
				{
					name: 'Fun',
					value: '/bonk · /furry · /hug · /kiss · /pat · /stab',
					inline: false,
				},
				{
					name: 'Info',
					value: '/help · /ping',
					inline: false,
				},
			)
			.setColor(0xED4245);
		await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
	},
};
