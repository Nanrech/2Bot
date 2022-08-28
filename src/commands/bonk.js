const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bonk')
		.setDescription('*BONK*')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The victim')
				.setRequired(true)),
	async execute(interaction) {
		let bonkTarget = `Bonked by ${interaction.user.username}`;
		if (interaction.options.getUser('user').id === interaction.user.id) {
			bonkTarget = 'lol, self bonk';
		}
		const bonkEmbed = new EmbedBuilder()
			.setDescription(`<a:_:768088472275517470> <@${interaction.options.getUser('user').id}>`)
			.setFooter({ text: bonkTarget })
			.setColor(0xED4245);
		await interaction.channel.send({ embeds: [bonkEmbed] });
		await interaction.reply({ content: 'Bonk sent :hammer:', ephemeral: true });
	},
};
