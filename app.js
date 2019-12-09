// Utilities
const Log = require("./logging/logging.js");

// Local Dependencies
const config = require("./config.json");

// Package Dependencies
const fileSystem = require("fs");
const Discord = require("discord.js");
const Sequelize = require("sequelize");

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
}).catch(console.error);

// Create an object to store the command in.
/* eslint-disable*/
let commands = {};
let events = {};
/* eslint-enable */

// Run the command handler when the bot is ready.
client.on("ready", () => {
	// Fetch the authentication message so that it is cached.
	client.guilds.find((guild) => {
		return guild.id == config.guild;
	}).channels.find((channel) => {
		return channel.id == config.authentication_channel;
	}).fetchMessage(config.authentication_message);

	// Add all the commands and events to their specific objects.
	fileSystem.readdir(config.commands_directory, (error, files) => {
		Log.debug("Commands:");
		for (const file of files) {
			/* eslint-disable */
			commands[file.replace(".js", "")] = require(`${config.commands_directory}/${file}`);
			/* eslint-enable */
			Log.debug(`+ ${file}`);
		}
	});

	fileSystem.readdir(config.events_directory, (error, files) => {
		Log.debug("Events:");
		for (const file of files) {
			/* eslint-disable */
			events[file.replace(".js", "")] = require(`${config.events_directory}/${file}`);
			/* eslint-enable */
			Log.debug(`+ ${file}`);
		}
	});
});

// Run when a message is sent
client.on("message", (message) => {
	for (const commandFile in commands) {
		const command = commands[commandFile];
		const properties = command.properties;
		const args = message.content.split(" ");

		if (args[0].replace(config.prefix, "") == properties.command) {
			if (properties.botchat) {
				if (message.channel.id != config.botchat) {
					break;
				}
			}

			if (properties.prefix) {
				if (message.content.startsWith(config.prefix)) {
					if (properties.arguments.length == 0) {
						command.run(message);
					} else {
						command.run(message, args);
					}
				}
			} else {
				if (message.content.startsWith(properties.command)) {
					if (properties.arguments.length == 0) {
						command.run(message);
					} else {
						command.run(message, args);
					}
				}
			}
		}
	}

	if (message.content.startsWith(`${config.prefix}commands`)) {
		const embed = new Discord.RichEmbed();

		embed.setTitle("Commands");
		for (const commandFile in commands) {
			const properties = commands[commandFile].properties;

			if (properties.visible) {
				const command = properties.prefix ? `${config.prefix}${properties.command}` : properties.command;
				const arguments = properties.arguments.length == 0 ? "" : properties.arguments.toString().replace(new RegExp(",", "g"), " ");

				embed.addField(`${command} ${arguments}`, properties.description, true);
			}
		}
		message.channel.send({embed});
	}
});

// Events
client.on("messageUpdate", (oldMessage, newMessage) => {
	events.messageUpdate.run(oldMessage, newMessage);
});

client.on("messageDelete", (message) => {
	events.messageDelete.run(message);
});

client.on("messageReactionAdd", (reaction, user) => {
	events.messageReactionAdd.run(reaction, user);
});

client.on("guildMemberAdd", (member) => {
	events.guildMemberAdd.run(member);
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