const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pat')
		.setDescription('*pat pat pat*')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The victim')
				.setRequired(true)),
	async execute(interaction) {
		let emoji = '<:bunnyheart:957491852272099348>';
		switch (interaction.options.getUser('user').id) {
		case '291620843363106828':
			emoji = '<:furryheart:709831332699832411>';
			break;
		case '399049916757966848':
			emoji = '<:heart_hoss:734040585538633873>';
			break;
		case '554556322377498630':
			emoji = '<:heart_veggie:734805123406102538>';
			break;
		case '605022712120868893':
			emoji = '<:panohug:796803635199737917>';
			break;
		case '555955952621322243':
			emoji = '<:heart_gold3n:796547519034425364>';
			break;
		case '313350346724343809':
			emoji = '<:hellcastleheart:760351791526445057>';
			break;
		case '355626930407473154':
			emoji = '<:heart_anna:725827696948543528>';
			break;
		case '284985220669767680':
			emoji = '<:rosieheart:855828624062283776>';
			break;
		case '452954731162238987':
			emoji = ':shark:';
			break;
		case '318754659621928960':
			emoji = '<:heart_keanuwu:734054335419514960>';
			break;
		case '505954570371989544':
			emoji = '<:heart_yikes:756371007559696385>';
			break;
		case '738946582715826259':
			emoji = '<:heart_commieleafeon:753693922370256928>';
			break;
		case '298495114748362762':
			emoji = '<:heart_bashar:756573559522066432>';
			break;
		}
		let patTarget = `Pat by ${interaction.user.username}`;
		if (interaction.user.id == interaction.options.getUser('user').id) {
			patTarget = 'lol they pat themselves';
		}
		const patEmbed = new EmbedBuilder()
			.setDescription(`${emoji} <@${interaction.options.getUser('user').id}>`)
			.setFooter({ text: patTarget })
			.setColor(0xED4245);
		await interaction.channel.send({ embeds: [patEmbed] });
		await interaction.reply({ content: 'Pat sent :heart:', ephemeral: true });
	},
};
