// Local Dependencies
const config = require("./config.json");

// Package Dependencies
const fileSystem = require("fs");
const Discord = require("discord.js");

// Setup the Discord Client
const client = new Discord.Client({
	fetchAllMembers: true
});

// Create an object to store the command in.
let commands = {};

// Run the command handler when the bot is ready.
client.on("ready", () => {
	fileSystem.readdir(config.commands_directory, (error, files) => {
		for (const file of files) {
			commands[file.replace(".js", "")] = require(`${config.commands_directory}/${file}`);
			console.log(`+ ${file}`);
		}
	});
});

// Run when a message is sent
client.on("message", (message) => {
	for (const commandFile in commands) {
		// Ensure the commands object has a key of the commandFile value
		if (!commands.hasOwnProperty(commandFile)) {
			continue;
		}
		const command = commands[commandFile];
		const properties = command.properties;
		const args = message.content.split(" ");

		if (args[0].replace(config.prefix, "") === properties.command) {
			const messagePrefix = properties.prefix ? config.prefix : properties.command;
			if (message.content.startsWith(messagePrefix)) {
				if (properties.arguments.length === 0) {
					command.run(message);
				} else {
					command.run(message, args);
				}
			}
		}
	}

	if (message.content.startsWith(`${config.prefix}commands`)) {
		const embed = new Discord.RichEmbed();

		embed.setTitle("Commands");
		for (const commandFile in commands) {
			// Ensure the commands object has a key of the commandFile value
			if (!commands.hasOwnProperty(commandFile)) {
				continue;
			}
			const properties = commands[commandFile].properties;

			if (properties.visible) {
				const command = properties.prefix ? `${config.prefix}${properties.command}` : properties.command;
				const arguments = properties.arguments.length === 0 ? "" : properties.arguments.toString().replace(new RegExp(",", "g"), " ");

				embed.addField(`${command} ${arguments}`, properties.description, true);
			}
		}
		message.channel.send({embed});
	}
});


// Log the client in to establish a connection to Discord.
client.login(config.discord_token).then(() => {
	console.log(`Successfully connected to Discord as '${client.user.username}'.`);
}).catch(console.error);
