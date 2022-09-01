const { SlashCommandBuilder } = require('discord.js');
const { addXP, setLevel } = require('../events/messageCreate');
const { getReqXP } = require('../functions');

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
				.setName('cooldown')
				.setDescription('Changes the current XP cooldown'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('mult')
				.setDescription('Sets the random XP multiplier. 0 is NO random XP bonus and 100 means 2x XP')
				.addIntegerOption(option =>
					option
						.setName('mult-value')
						.setDescription('XP multiplier value')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('base-xp')
				.setDescription('Sets the base XP value')
				.addIntegerOption(option =>
					option
						.setName('bexp-value')
						.setDescription('Base XP value')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('reaction-roles')
				.setDescription('Sends an embed with all the reaction roles available. DO NOT USE IF YOU DON\'T KNOW WHAT YOU\'RE DOING'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('mass-xp')
				.setDescription('Runs through ALL members & assigns XP based on their roles. Handle with care!')),
	async execute(interaction) {
		if (interaction.user.id != '452954731162238987') {interaction.reply('No, shut up');}
		if (interaction.options.getSubcommand() == 'add-xp' || interaction.options.getSubcommand() == 'remove-xp') {
			const victim = interaction.options.getUser('victim');
			const quantity = interaction.options.getInteger('quantity');
			const negCheck = interaction.options.getSubcommand() == 'remove-xp' ? -1 : 1;
			const action = negCheck == -1 ? `Removed ${quantity} from ` : `Added ${quantity} to `;
			addXP(victim.id, quantity * negCheck).then(final => {
				interaction.reply(`${action} ${victim.username}. Current XP: ${final.xp}`);
				if (final.xp > getReqXP(final.level) || final.xp < getReqXP(final.level - 1)) {
					setLevel(victim.id);
				}
			});
		}
	},
};
