// Dependencies
const app = require("./../app.js");
const request = require("request-promise-native");

const Discord = app.Discord;

// Set the command's properties
const properties = {
	command: "npm",
	description: "Displays a link to a given NPM package in the chat.",
	prefix: true,
	arguments: ["<package>"],
	visible: true,
	botchat: false
};

// The code that runs when the command is executed.
async function run(message, args) {
	if (typeof args[1] == "undefined") {
		const embed = new Discord.RichEmbed();

		embed.setTitle("Error");
		embed.setDescription("You must define a NPM package.");
		embed.addField("Correct Usage", "?npm <package>");

		message.channel.send({embed});
	} else {
		try {
			const data = await request({
				uri: `https://www.npmjs.com/package/${args[1]}`,
				method: "GET",
				resolveWithFullResponse: true
			});

			if (data.statusCode == 200) {
				message.channel.send(`https://www.npmjs.com/package/${args[1]}`);
			}
		} catch (error) {
			const embed = new Discord.RichEmbed();

			embed.setTitle("Error");
			embed.setDescription("That is not a valid NPM package.");

			message.channel.send({embed});
		}
	}
}

// Export the data to the command handler
exports.properties = properties;
exports.run = run;