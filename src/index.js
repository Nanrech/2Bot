// Lib imports;
const fs = require('node:fs');
const path = require('node:path');

// Specific imports;
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { token } = require('./config.json');

// Constant declaration;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages], partials: [Partials.Channel, Partials.Message, Partials.Reaction] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Interaction Handler, READY listener & login;
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: `Could not respond to interaction \`${interaction}\``, ephemeral: true });
	}
});

client.on('ready', async () => {
	console.log('Bot online');
});

client.login(token);
