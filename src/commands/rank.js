const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const memberModel = require('../schemas/member');
const { getLevel, getReqXP } = require('../common');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Displays XP & level')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Whose XP you want to get. Defaults to yourself.')
				.setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getUser('target') == null ? interaction.user : interaction.options.getUser('target');
		const memberDocument = await memberModel.findOne({ id: member.id }).exec();
		const memberLevel = getLevel(memberDocument.xp);

		if (!memberDocument) return interaction.reply('Something went wrong fetching that document from the database. Wait a moment before using again');
		// If it's null we're fucked I guess


		const rankEmbed = new EmbedBuilder()
			.setColor(0xED4245)
			.setTitle(`@${member.username}`)
			.addFields([
				{
					'name': 'Level',
					'value': `\`${memberLevel}\``,
					'inline': true,
				},
				{
					'name': 'XP',
					'value': `\`${memberDocument.xp.toLocaleString('en-us')}\``,
					'inline': true,
				},
				{
					'name': `XP until ${memberLevel + 1}`,
					'value': `\`${(getReqXP(memberLevel + 1) - memberDocument.xp).toLocaleString('en-us')}\``,
					'inline': true,
				},
			])
			.setThumbnail(member.displayAvatarURL())
			.setFooter({ text: memberDocument._id.toString() });

		interaction.reply({ embeds: [rankEmbed] });
	},
};
