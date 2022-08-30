const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('I don\'t think you can see this description :thonk:')
		.addSubcommand(subcommand =>
			subcommand
				.setName('blacklist-add')
				.setDescription('Add a channel to the blacklist'),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('blacklist-remove')
				.setDescription('Removes a channel from the blacklist'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('xp-add')
				.setDescription('Gives xp to a member'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('xp-remove')
				.setDescription('Removes xp from a member'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('cooldown')
				.setDescription('Changes the current XP cooldown'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('mult')
				.setDescription('Sets the random XP multiplier. 0 is NO random XP bonus and 100 means 2x XP'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('basexp')
				.setDescription('Sets the base XP value')),
	async execute(interaction) {
		interaction.reply(`Command ran: \`${interaction.options.getSubcommand()}\` (this does literally nothing atm, mald, cope, seethe)`);
	},
};
