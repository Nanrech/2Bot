const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stab')
		.setDescription('Murder')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The victim')
				.setRequired(true)),
	async execute(interaction) {
		const stabEmbed = new EmbedBuilder()
			.setDescription(`<:stab:732327194763984916> <@${interaction.options.getUser('user').id}>`)
			.setFooter({ text: `Stabbed by ${interaction.user.username}` })
			.setColor(0xED4245);
		await interaction.channel.send({ embeds: [stabEmbed] });
		await interaction.reply({ content: 'Stab sent :knife:', ephemeral: true });
	},
};
