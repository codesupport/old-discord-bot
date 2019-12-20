// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

const Discord = app.Discord;

// Set the command's properties
const properties = {
	command: "codeblock",
	description: "Shows a tutorial on how to use Discord's codeblocks.",
	hasPrefix: true,
	arguments: [],
	isVisible: true,
	isBotChat: false
};

// The code that runs when the command is executed.
function run(message) {
	const embed = new Discord.RichEmbed();
	const image = new Discord.Attachment("./assets/codeblock.png", "codeblock-tutorial.png");

	embed.setTitle("Codeblock Tutorial");
	embed.setDescription("Please use codeblocks when sending code.");
	embed.addField("Sending lots of code?", "Consider using a [GitHub Gist](http://gist.github.com).");
	embed.attachFile(image);
	embed.setImage("attachment://codeblock-tutorial.png");

	message.channel.send({embed});
}

// Export the data to the command handler
exports.properties = properties;
exports.run = run;
