const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { addXP } = require('../events/messageCreate');
const { getReqXP, getLevel } = require('../functions');
const mongo = require('../mongo');
const memberSchema = require('../schemas/member-schema');
// This is ugly asf but oh well
class EmptyClass {
	constructor() {
		this.last = null;
	}
}
const lbCooldown = new EmptyClass;


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
		if (interaction.options.getSubcommand() == 'leaderboard') {
			await interaction.deferReply();
			if (lbCooldown.last) {
				if (interaction.createdTimestamp - lbCooldown.last < 30000) {
					interaction.editReply({ content: ':snowflake: Command on cooldown', ephemeral: true });
					return;
				}
			}
			lbCooldown.last = interaction.createdTimestamp;
			await mongo().then(async (mongoose) => {
				try {
					const query = memberSchema.find().sort({ xp: -1 }).limit(15);
					const topMembers = await query;
					const topEmbed = new EmbedBuilder()
						.setColor(0xED4245)
						.setTitle('Showing top members')
						.addFields(
							{ name: '1st', value: `lvl ${getLevel(topMembers[0].xp)} <@${topMembers[0].id}>\nXP: ${topMembers[0].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[0].xp) + 1) - topMembers[0].xp}\n`, inline: true },
							{ name: '2nd', value: `lvl ${getLevel(topMembers[1].xp)} <@${topMembers[1].id}>\nXP: ${topMembers[1].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[1].xp) + 1) - topMembers[1].xp}\n`, inline: true },
							{ name: '3rd', value: `lvl ${getLevel(topMembers[2].xp)} <@${topMembers[2].id}>\nXP: ${topMembers[2].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[2].xp) + 1) - topMembers[2].xp}\n`, inline: true },
							{ name: '4th', value: `lvl ${getLevel(topMembers[3].xp)} <@${topMembers[3].id}>\nXP: ${topMembers[3].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[3].xp) + 1) - topMembers[3].xp}\n`, inline: true },
							{ name: '5th', value: `lvl ${getLevel(topMembers[4].xp)} <@${topMembers[4].id}>\nXP: ${topMembers[4].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[4].xp) + 1) - topMembers[4].xp}\n`, inline: true },
							{ name: '6th', value: `lvl ${getLevel(topMembers[5].xp)} <@${topMembers[5].id}>\nXP: ${topMembers[5].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[5].xp) + 1) - topMembers[5].xp}\n`, inline: true },
							{ name: '7th', value: `lvl ${getLevel(topMembers[6].xp)} <@${topMembers[6].id}>\nXP: ${topMembers[6].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[6].xp) + 1) - topMembers[6].xp}\n`, inline: true },
							{ name: '8th', value: `lvl ${getLevel(topMembers[7].xp)} <@${topMembers[7].id}>\nXP: ${topMembers[7].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[7].xp) + 1) - topMembers[7].xp}\n`, inline: true },
							{ name: '9th', value: `lvl ${getLevel(topMembers[8].xp)} <@${topMembers[8].id}>\nXP: ${topMembers[8].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[8].xp) + 1) - topMembers[8].xp}\n`, inline: true },
							{ name: '10th', value: `lvl ${getLevel(topMembers[9].xp)} <@${topMembers[9].id}>\nXP: ${topMembers[9].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[9].xp) + 1) - topMembers[9].xp}\n`, inline: true },
							{ name: '11th', value: `lvl ${getLevel(topMembers[10].xp)} <@${topMembers[10].id}>\nXP: ${topMembers[10].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[10].xp) + 1) - topMembers[10].xp}\n`, inline: true },
							{ name: '12th', value: `lvl ${getLevel(topMembers[11].xp)} <@${topMembers[11].id}>\nXP: ${topMembers[11].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[11].xp) + 1) - topMembers[11].xp}\n`, inline: true },
							{ name: '13th', value: `lvl ${getLevel(topMembers[12].xp)} <@${topMembers[12].id}>\nXP: ${topMembers[12].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[12].xp) + 1) - topMembers[12].xp}\n`, inline: true },
							{ name: '14th', value: `lvl ${getLevel(topMembers[13].xp)} <@${topMembers[13].id}>\nXP: ${topMembers[13].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[13].xp) + 1) - topMembers[13].xp}\n`, inline: true },
							{ name: '15th', value: `lvl ${getLevel(topMembers[14].xp)} <@${topMembers[14].id}>\nXP: ${topMembers[14].xp}\nlvl-up: ${getReqXP(getLevel(topMembers[14].xp) + 1) - topMembers[14].xp}\n`, inline: true },
						);
					interaction.editReply({ embeds: [topEmbed] });
				}
				finally {mongoose.connection.close();}
			});
			return;
		}
		const member = interaction.options.getUser('target') == null ? interaction.user : interaction.options.getUser('target');
		if (member.bot) {
			interaction.reply({ content: 'Bots aren\'t allowed to play', ephemeral: true });
			return;
		}
		// lmao
		addXP(member.id, 0).then(final => {
			const lvlEmbed = new EmbedBuilder()
				.setColor(0xED4245)
				.setTitle(`${member.username}'s profile`)
				.setDescription(`Current level: ${getLevel(final.xp)}\nCurrent XP: ${final.xp} xp\nXP to next level: ${getReqXP(getLevel(final.xp) + 1) - final.xp} xp`);
			interaction.reply({ embeds: [lvlEmbed] });
		},
		);
	},
};
