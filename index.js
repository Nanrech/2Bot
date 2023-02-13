const fs = require('node:fs');
const path = require('node:path');

const mongoose = require('./src/mongo');
const { MongoNetworkTimeoutError } = require('mongoose');
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { token } = require('./src/config.json');


// Discord.js constant declaration boilerplate;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions], partials: [Partials.Channel, Partials.Message, Partials.Reaction] });
const commandsPath = path.join(__dirname, './src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, './src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
client.commands = new Collection();

// Command & event handlers;
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Interaction handler;
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	}
	catch (error) {
		console.error(error);
		if (error == MongoNetworkTimeoutError) {
			await mongoose();
		}
		interaction.channel.send((`Command crashed lmao \`${interaction.commandName}\``));
	}
});

client.login(token);
