const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows the bot\'s commands'),
	async execute(interaction) {
		const arrCmdMentions = [
			'</bonk:1009101965382402129>',
			'</furry:1009116885440270468>',
			'</help:1012689827386363936>',
			'</hug:1009123973482692702>',
			'</kiss:1009125573022453851>',
			'</pat:1009130313613590588>',
			'</ping:1007290802629775426>',
			'</say:1012680708008984648>',
			'</stab:1011610351328038972>',
			'</rank:1112883060808093807>',
			'</leaderboard:1112883060808093806>',
		];
		const helpEmbed = new EmbedBuilder()
			.setTitle('Help')
			.setDescription(`\`bonk\` ${arrCmdMentions[0]}\t\`furry\` ${arrCmdMentions[1]}\n\`help\` ${arrCmdMentions[2]}\t\`hug\` ${arrCmdMentions[3]}\n\`kiss\` ${arrCmdMentions[4]}\t\`pat\` ${arrCmdMentions[5]}\n\`ping\` ${arrCmdMentions[6]}\t\`say\` ${arrCmdMentions[7]}\n\`stab\` ${arrCmdMentions[8]}\t\`rank\` ${arrCmdMentions[9]}\n\`leaderboard\` ${arrCmdMentions[10]}`)
			.setTimestamp(Date.now())
			.setColor(0xED4245);
		await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
	},
};
