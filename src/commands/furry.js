const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('furry')
		.setDescription('OwO'),
	async execute(interaction) {
		if (!interaction.member.permissions.has('BanMembers')) {
			await interaction.reply({ content: 'Only __mods__ can use this command', ephemeral: true });
		}
		const furryEmbed = new EmbedBuilder()
			.setColor(0xED4245)
			.addFields(
				{ name: '[Intro]', value: 'Okay, I know this is a really bad idea but\nI\'m already here so\nHere we fuckin’ go\nRawr' },
				{ name: '[Verse 1]', value: 'x3 nuzzles, pounces on you, uwu you so warm(Ooh)\nCouldn\'t help but notice your bulge from across the floor\nNuzzles your necky wecky - tilde murr - tilde, hehe\nUnzips your baggy ass pants, oof baby you so musky\nTake me home, pet me, and make me yours and don\'t forget to stuff me\nSee me wag my widdle baby tail all for your buldgy - wuldgy\nKissies and lickies your neck\nI hope daddy likies\nNuzzles and wuzzles your chest(Yuh)\nI be(Yeah) gettin’ thirsty' },
				{ name: '[Verse 2]', value: 'Hey, I got a little itch, you think you can help me?\nOnly seven inches long, uwu, please adopt me\nPaws on your buldge as I lick my lips(UwU, punish me please)\n\'Bout to hit \'em with this furry shit(He don\'t see it comin\')[Intro]\nOkay, I know this is a really bad idea but\nI\'m already here so\nHere we fuckin’ go\nRawr' },
			)
			.setImage('https://i.ytimg.com/vi/h6DNdop6pD8/maxresdefault.jpg');
		await interaction.reply({ embeds: [ furryEmbed ] });
	},
};
