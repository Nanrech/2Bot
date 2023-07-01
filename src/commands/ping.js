const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function convertMs(s) {
	// Modified Hoss code
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
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('pong?'),
	async execute(interaction, client) {
		const sent = await interaction.reply({ content: '〽️ Pinging', fetchReply: true });
		const pingEmbed = new EmbedBuilder()
			.setTitle('📶 Ping')
			.setColor(0xED4245)
			.setTimestamp(Date.now())
			.addFields(
				{ name: '**Latency:**', value: `${sent.createdTimestamp - interaction.createdTimestamp} ms` },
				{ name: '**API:**', value: `${Math.round(client.ws.ping)}ms` },
				{ name: '**Uptime:**', value: `${convertMs(client.uptime)}` },
			);
		await interaction.editReply({ content: '', embeds: [ pingEmbed ] });
	},
};
