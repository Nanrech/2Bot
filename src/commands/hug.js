const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Send your virtual hugs')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The victim')
				.setRequired(true)),
	async execute(interaction) {
		let hugTarget = `Hugged by ${interaction.user.username}`;
		let hugDescription = `<:huggg:720769061465620540> <@${interaction.options.getUser('user').id}>`;
		if (interaction.options.getUser('user').id === interaction.user.id) {
			hugTarget = 'Maybe you can! *self-hug*';
			hugDescription = 'Can you hug yourself? <:sylvthink:875707232560500767>';
		}
		const hugEmbed = new EmbedBuilder()
			.setDescription(hugDescription)
			.setFooter({ text: hugTarget })
			.setColor(0xED4245);
		await interaction.channel.send({ embeds: [hugEmbed] });
		await interaction.reply({ content: 'Hug sent :heart:', ephemeral: true });
	},
};
