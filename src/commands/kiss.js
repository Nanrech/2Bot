const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription('Send your virtual kisses')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The victim')
				.setRequired(true)),
	async execute(interaction) {
		addXP(interaction.user.id, 50);
		let emoji = '<:wholesomekiss:733723707473788958>';
		switch (interaction.options.getUser('user').id) {
		case '291620843363106828':
			emoji = '<:furryheart:709831332699832411>';
			break;
		case '275676875593089046':
			emoji = '<:electrix:739264872575139890>';
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
		case '308671398107414529':
			emoji = '<:heart_sam:734036761608716340>';
			break;
		case '555955952621322243':
			emoji = '<:heart_gold3n:796547519034425364>';
			break;
		case '313350346724343809':
			emoji = '<:hellcastleheart:760351791526445057>';
			break;
		case '375739374610153482':
			emoji = '<:heart_excel:753728813451444387>';
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
		case '473324594858557440':
			emoji = '<:heart_h:751480634190331956>';
			break;
		}
		let kissTarget = `Kissed by ${interaction.user.username}`;
		let kissDescription = `${emoji} <@${interaction.options.getUser('user').id}>`;
		if (interaction.options.getUser('user').id === interaction.user.id) {
			kissTarget = 'Maybe you can, idk';
			kissDescription = 'Can you kiss yourself? <:sylvthink:875707232560500767>';
		}
		const kissEmbed = new EmbedBuilder()
			.setDescription(kissDescription)
			.setFooter({ text: kissTarget })
			.setColor(0xED4245);
		await interaction.reply({ content: 'Kiss sent :heart:', ephemeral: true });
		await interaction.channel.send({ embeds: [kissEmbed] });
	},
};
