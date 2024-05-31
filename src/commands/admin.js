const { SlashCommandBuilder } = require('discord.js');
const memberModel = require('../schemas/member');


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
				.setDescription('Good night')),
	async execute(interaction) {
		// interaction.member.roles.cache.each(role => console.log(role));
		if (!interaction.member.roles.cache.some(role => (role.id == '709434503294091294' || role.id == '780428613962956810'))) {
			interaction.reply('No, shut up');
			return;
		}

		if (interaction.options.getSubcommand() == 'shutdown') {
			interaction.reply('Shutting down');
			console.log('Shutting down bot');
			await new Promise(resolve => setTimeout(resolve, 1000));
			// fancy "wait for a second" I stole from stackoverflow
			process.exit(1);
		}

		else if (interaction.options.getSubcommand() == 'xp-add' || interaction.options.getSubcommand() == 'xp-remove') {
			const victim = interaction.options.getUser('victim');
			const quantity = interaction.options.getInteger('quantity');
			const negCheck = interaction.options.getSubcommand() == 'xp-remove' ? -1 : 1;

			await memberModel.findOneAndUpdate({ id: victim.id }, { $inc: { xp: quantity * negCheck } }, { upsert: true, new: true });
			interaction.reply(`${quantity * negCheck} XP for <@${victim.id}>`);
		}
	},
};
