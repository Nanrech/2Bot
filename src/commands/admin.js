const { SlashCommandBuilder } = require('discord.js');
const { addXP } = require('../events/messageCreate');

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
		if (interaction.options.getSubcommand() != 'mass-xp') {interaction.reply(`Command ran: \`${interaction.options.getSubcommand()}\` (this does literally nothing atm)`);}
		if (interaction.user.id != '452954731162238987') {interaction.reply('No, shut up');}
		// console.log(interaction.client.guilds.cache.get('707341019275853847').members.cache);
		// interaction.guild.roles.fetch('415665311828803584').members.map(m => m.user.tag);
		// interaction.guild.members.fetch();
		let allMembers;
		interaction.guild.members.fetch()
			.then(value => {
				allMembers = value;
			})
			.catch(error => console.error(error));
		const t = allMembers.filter(member => member.roles.cache.has('780428613962956810'));
		addXP;
	},
};
