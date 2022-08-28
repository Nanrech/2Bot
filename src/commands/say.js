const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Echo. . .')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The text you want to send')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The target channel. Leave blank to send it here')
				.setRequired(false)),
	async execute(interaction) {
		const channel_option = interaction.options.getChannel('channel');
		const channel = channel_option == null ? interaction.channel : channel_option;
		await channel.send(interaction.options.getString('text'));
		await interaction.reply({ content: `Message sent at ${channel}`, ephemeral: true });
	},
};
