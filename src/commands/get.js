const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { addXP } = require('../events/messageCreate');
const { getReqXP } = require('../functions');
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
			if (lbCooldown.last) {
				if (interaction.createdTimestamp - lbCooldown.last < 30000) {
					interaction.reply({ content: ':snowflake: Command on cooldown', ephemeral: true });
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
							{ name: '1', value: `lvl ${topMembers[0].level} <@${topMembers[0].id}>\nXP: ${topMembers[0].xp}\nlvl-up: ${getReqXP(topMembers[0].level + 1) - topMembers[0].xp}\n`, inline: true },
							{ name: '2', value: `lvl ${topMembers[1].level} <@${topMembers[1].id}>\nXP: ${topMembers[1].xp}\nlvl-up: ${getReqXP(topMembers[1].level + 1) - topMembers[1].xp}\n`, inline: true },
							{ name: '3', value: `lvl ${topMembers[2].level} <@${topMembers[2].id}>\nXP: ${topMembers[2].xp}\nlvl-up: ${getReqXP(topMembers[2].level + 1) - topMembers[2].xp}\n`, inline: true },
							{ name: '4', value: `lvl ${topMembers[3].level} <@${topMembers[3].id}>\nXP: ${topMembers[3].xp}\nlvl-up: ${getReqXP(topMembers[3].level + 1) - topMembers[3].xp}\n`, inline: true },
							{ name: '5', value: `lvl ${topMembers[4].level} <@${topMembers[4].id}>\nXP: ${topMembers[4].xp}\nlvl-up: ${getReqXP(topMembers[4].level + 1) - topMembers[4].xp}\n`, inline: true },
							{ name: '6', value: `lvl ${topMembers[5].level} <@${topMembers[5].id}>\nXP: ${topMembers[5].xp}\nlvl-up: ${getReqXP(topMembers[5].level + 1) - topMembers[5].xp}\n`, inline: true },
							{ name: '7', value: `lvl ${topMembers[6].level} <@${topMembers[6].id}>\nXP: ${topMembers[6].xp}\nlvl-up: ${getReqXP(topMembers[6].level + 1) - topMembers[6].xp}\n`, inline: true },
							{ name: '8', value: `lvl ${topMembers[7].level} <@${topMembers[7].id}>\nXP: ${topMembers[7].xp}\nlvl-up: ${getReqXP(topMembers[7].level + 1) - topMembers[7].xp}\n`, inline: true },
							{ name: '9', value: `lvl ${topMembers[8].level} <@${topMembers[8].id}>\nXP: ${topMembers[8].xp}\nlvl-up: ${getReqXP(topMembers[8].level + 1) - topMembers[8].xp}\n`, inline: true },
							{ name: '10', value: `lvl ${topMembers[9].level} <@${topMembers[9].id}>\nXP: ${topMembers[9].xp}\nlvl-up: ${getReqXP(topMembers[9].level + 1) - topMembers[9].xp}\n`, inline: true },
							{ name: '11', value: `lvl ${topMembers[10].level} <@${topMembers[10].id}>\nXP: ${topMembers[10].xp}\nlvl-up: ${getReqXP(topMembers[10].level + 1) - topMembers[10].xp}\n`, inline: true },
							{ name: '12', value: `lvl ${topMembers[11].level} <@${topMembers[11].id}>\nXP: ${topMembers[11].xp}\nlvl-up: ${getReqXP(topMembers[11].level + 1) - topMembers[11].xp}\n`, inline: true },
							{ name: '13', value: `lvl ${topMembers[12].level} <@${topMembers[12].id}>\nXP: ${topMembers[12].xp}\nlvl-up: ${getReqXP(topMembers[12].level + 1) - topMembers[12].xp}\n`, inline: true },
							{ name: '14', value: `lvl ${topMembers[13].level} <@${topMembers[13].id}>\nXP: ${topMembers[13].xp}\nlvl-up: ${getReqXP(topMembers[13].level + 1) - topMembers[13].xp}\n`, inline: true },
							{ name: '15', value: `lvl ${topMembers[14].level} <@${topMembers[14].id}>\nXP: ${topMembers[14].xp}\nlvl-up: ${getReqXP(topMembers[14].level + 1) - topMembers[14].xp}\n`, inline: true },
						);
					interaction.reply({ content: 'heavily WIP', embeds: [topEmbed] });
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
				.setDescription(`Current level: ${final.level}\nCurrent XP: ${final.xp} xp\nXP to next level: ${getReqXP(final.level + 1) - final.xp} xp`);
			interaction.reply({ embeds: [lvlEmbed] });
		},
		);
	},
};
