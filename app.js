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
	console.log(`Successfully connected to MySQL as '${process.env.MYSQL_USER}'.`);
}).catch(console.error);

// Create an object to store the command in.
/* eslint-disable*/
let commands = {};
/* eslint-enable */

// Run the command handler when the bot is ready.
client.on("ready", () => {
	fileSystem.readdir(config.commands_directory, (error, files) => {
		for (const file of files) {
			/* eslint-disable */
			commands[file.replace(".js", "")] = require(`${config.commands_directory}/${file}`);
			/* eslint-enable */
			console.log(`+ ${file}`);
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

// Log the client in to establish a connection to Discord.
client.login(process.env.DISCORD_TOKEN).then(() => {
	console.log(`Successfully connected to Discord as '${client.user.username}'.`);
}).catch(console.error);

// Export dependencies so that they can be used throughout the program
exports.config = config;
exports.fileSystem = fileSystem;
exports.Discord = Discord;
exports.client = client;
exports.Sequelize = Sequelize;
exports.sql = sql;