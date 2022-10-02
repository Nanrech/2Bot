const { SlashCommandBuilder } = require('discord.js');
const { addXP } = require('../events/messageCreate');
const { getLevel } = require('../functions');
const rE = require('../events/ready');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('I don\'t think you can see this description :thonk:')
		.addSubcommand(subcommand =>
			subcommand
				.setName('xp-add')
				.setDescription('Gives xp to a member')
				.addIntegerOption(option =>
					option
						.setName('quantity')
						.setDescription('XP to add')
						.setRequired(true))
				.addUserOption(option =>
					option
						.setName('victim')
						.setDescription('The victim')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('xp-remove')
				.setDescription('Removes xp from a member')
				.addIntegerOption(option =>
					option
						.setName('quantity')
						.setDescription('XP to remove')
						.setRequired(true))
				.addUserOption(option =>
					option
						.setName('victim')
						.setDescription('The victim')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('shutdown')
				.setDescription('Good night'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('mass-xp')
				.setDescription('Runs through ALL members & assigns XP based on their roles. Handle with care!')),
	async execute(interaction) {
		if (interaction.member.roles.cache.some(role => {String(role.id) == '709434503294091294';})) {
			interaction.reply('No, shut up');
			return;
		}

		else if (interaction.options.getSubcommand() == 'shutdown') {
			interaction.reply('Shutting down');
			console.log('[IMPORTANT] Shutting down bot');
			await new Promise(resolve => setTimeout(resolve, 1000));
			// fancy "wait for a second" I stole from stackoverflow
			process.exit(0);
		}

		else if (interaction.options.getSubcommand() == 'xp-add' || interaction.options.getSubcommand() == 'xp-remove') {
			const victim = interaction.options.getUser('victim');
			const quantity = interaction.options.getInteger('quantity');
			const negCheck = interaction.options.getSubcommand() == 'xp-remove' ? -1 : 1;
			const action = negCheck == -1 ? `Removed ${quantity} xp from` : `Added ${quantity} xp to`;
			console.log(`[ADMIN-LOG] ${negCheck * quantity} from/for ${victim.id}`);
			addXP(victim.id, quantity * negCheck).then(final => {
				const updatedXP = final.xp;
				const calculatedLevel = getLevel(updatedXP);
				if (calculatedLevel != final.level) {
					interaction.reply(`${action} ${victim.username}. Current XP & level: ${updatedXP} xp | ${calculatedLevel}`);
				}
				interaction.reply(`${action} ${victim.username}. Current XP & level: ${updatedXP} xp | ${calculatedLevel}`);
			},
			);

		}

		else if (interaction.options.getSubcommand() == 'mass-xp') {
			interaction.guild.members.fetch();
			const totalVerified = interaction.guild.roles.cache.get('727884232743059486').members.map(m => m);
			const level100 = [];
			const level90 = [];
			const level80 = [];
			const level70 = [];
			const level60 = [];
			const level50 = [];
			const level40 = [];
			const level30 = [];
			const level20 = [];
			const level15 = [];
			const level10 = [];
			totalVerified.forEach(member => {
				console.log('2');
				if (member.roles.cache.some(role => {rE.roleEnum.levels.role100.id == role.id;})) {
					level100.push(member);
					totalVerified.splice(totalVerified.findIndex(member));
				}
				else if (member.roles.cache.some(role => {rE.roleEnum.levels.role90 == role;})) {
					level90.push(member);
					totalVerified.splice(totalVerified.findIndex(member));
				}
			});
			console.log(level100.length);
			console.log(level90.length);
		}


	},
};
