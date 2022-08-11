const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const functions = require('../functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		const sent = await interaction.reply({ content: '〽️ Pinging', fetchReply: true });
		const pingEmbed = new EmbedBuilder()
			.setTitle('📶 Ping')
			.setColor(0xED4245)
			.addFields(
				{ name: '**Latency:**', value: `${sent.createdTimestamp - interaction.createdTimestamp} ms.` },
				{ name: '**API:**', value: `${Math.round(client.ws.ping)}ms` },
				{ name: '**Uptime:**', value: `${functions.convertMs(client.uptime)}` },
			);
		await interaction.editReply({ content: '', embeds: [ pingEmbed ] });
	},
};
