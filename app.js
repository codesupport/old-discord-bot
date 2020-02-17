// Package Dependencies
const fileSystem = require("fs");
const Discord = require("discord.js");
const Sequelize = require("sequelize");
const path = require("path");

// Global variables
global._ROOT_DIR = path.resolve(__dirname);

// Local Dependencies
const config = require(`${_ROOT_DIR}/config.json`);
const commands = require(`${_ROOT_DIR}/app/Commands.js`);
const events = require(`${_ROOT_DIR}/app/Events.js`);
const Log = require(`${_ROOT_DIR}/logging/logging.js`);
const AppLoader = require(`${_ROOT_DIR}/app/appLoader.js`);

// String constants
const MESSAGE_UPDATE = "messageUpdate";
const MESSAGE_DELETE = "messageDelete";
const MESSAGE_REACTION_ADD = "messageReactionAdd";
const GUILD_MEMBER_ADD = "guildMemberAdd";

// Crons
const midnightCron = require("./crons/midnightCron");

// Setup the Discord Client
const client = new Discord.Client({
	fetchAllMembers: true
});

// Setup Sequelize to connect to MySQL
const sql = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
	host: process.env.MYSQL_HOST,
	dialect: "mysql",
	logging: false
});

sql.authenticate().then(() => {
	Log.info(`Successfully connected to MySQL as '${process.env.MYSQL_USER}'.`);
}).catch((error) => {
	Log.error(`Failed to connect to DB (${error.original.address}:${error.original.port}) - ${error.name}`);
	Log.error(`Reason: ${error.original.code}`);
	process.exit(1);
});

// Run the command handler when the bot is ready.
client.on("ready", async() => {
	AppLoader.setClient(client);
	AppLoader.setConfig(config);
	AppLoader.loadResources({ commands, events });

	midnightCron(client);
});

// Run when a message is sent
client.on("message", (message) => {
	const args = message.content.split(" ");

	if (commands.hasCommand(args[0])) {
		const command = commands.getCommand(args[0]);

		if (!command.isBotChat || message.channel.id === config.botchat) {
			if (command.hasArguments) {
				command.run(message, args);
			} else {
				command.run(message);
			}
		}
	}
});

// Events
client.on(MESSAGE_UPDATE, (oldMessage, newMessage) => {
	events.getEvent(MESSAGE_UPDATE).run(oldMessage, newMessage);
});

client.on(MESSAGE_DELETE, (message) => {
	events.getEvent(MESSAGE_DELETE).run(message);
});

client.on(MESSAGE_REACTION_ADD, (reaction, user) => {
	events.getEvent(MESSAGE_REACTION_ADD).run(reaction, user);
});

client.on(GUILD_MEMBER_ADD, (member) => {
	events.getEvent(GUILD_MEMBER_ADD).run(member);
});

// Log the client in to establish a connection to Discord.
client.login(process.env.DISCORD_TOKEN).then(() => {
	Log.info(`Successfully connected to Discord as '${client.user.username}'.`);
}).catch(console.error);

// Export dependencies so that they can be used throughout the program
exports.config = config;
exports.fileSystem = fileSystem;
exports.Discord = Discord;
exports.client = client;
exports.Sequelize = Sequelize;
exports.sql = sql;
exports.commands = commands;
