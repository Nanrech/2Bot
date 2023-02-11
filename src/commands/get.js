const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const memberSchema = require('../schemas/member');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('get')
		.setDescription('I don\'t think you can see this description owo')
		.addSubcommand(subcommand =>
			subcommand
				.setName('leaderboard')
				.setDescription('Gets the top 15 members'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('rank')
				.setDescription('Displays your current rank')
				.addUserOption(option =>
					option
						.setName('target')
						.setDescription('Who you want to spy on. Defaults to author')
						.setRequired(false))),
	async execute(interaction) {
		if (interaction.options.getSubcommand() == 'rank') {
			const member = interaction.options.getUser('target') == null ? interaction.user : interaction.options.getUser('target');
			const memberDocument = await memberSchema.findOne({ id: member.id }).exec();

			if (!memberDocument) return interaction.reply('Something went wrong fetching that document from the database. Wait a moment before using again');
			// If it's null we're fucked I guess

			const rankEmbed = new EmbedBuilder()
				.setColor(0xED4245)
				.setTitle(`${member.username}'s profile`)
				.setDescription(`Current level: ${getLevel(memberDocument.xp)}\nCurrent XP: ${memberDocument.xp} xp\nXP to next level: ${getReqXP(getLevel(memberDocument.xp) + 1) - memberDocument.xp} xp`);
			interaction.reply({ embeds: [rankEmbed] });
		}

		else {
			// Leaderboard shenanigans
			const topMembers = await memberSchema
				.find()
				.sort({ xp: -1 })
				.limit(15);
			if (!topMembers) return interaction.reply('Something went wrong fetching that document from the database. Wait a moment before using again');

			let usernames = '';
			let levels = '';
			let xp = '';

			for (let i = 0; i != 15; i++) {
				// https://stackoverflow.com/questions/60607341/displaying-leaderboard-in-embed
				usernames += `\`${i + 1}\` <@${topMembers[i].id}>\n`;
				levels += `\`${getLevel(topMembers[i].xp)}\`\n`;
				xp += `\`${topMembers[i].xp.toLocaleString('en-us')}\`\n`;
			}

			usernames = usernames
				.replace('`1`', '`🏆`')
				.replace('`2`', '`🥈`')
				.replace('`3`', '`🥉`');

			const leaderboardEmbed = new EmbedBuilder()
				.setColor(0xED4245)
				.addFields(
					{ name: 'Top 15 members', value: usernames, inline: true },
					{ name: 'Level', value: levels, inline: true },
					{ name: 'XP', value: xp, inline: true },
				);

			interaction.reply({ embeds: [leaderboardEmbed] });

		}
	},
};

function getReqXP(l) {
	return (150 * (Math.pow(l, 2) + l));
}

function getLevel(xp) {
	const XP = Number(xp);
	if (XP < 300) {return 0;}
	return Math.floor((-1 + Math.sqrt((XP / 37.5) + 1)) / 2) + 1;
}
