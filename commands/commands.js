// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

const Discord = app.Discord;

// Set the command's properties
const properties = {
	command: "commands",
	description: "List all available commands.",
	hasPrefix: true,
	arguments: [],
	isVisible: false,
	isBotChat: false
};

// The code that runs when the command is executed.
function run(message) {
	const commands = app.commands.getCommands();
	const embed = new Discord.RichEmbed();

	embed.setTitle("Commands");
	for (const command in commands) {
		const commandObject = commands[command];

		if (commandObject.isVisible) {
			const arguments = commandObject.hasArguments ? "" : commandObject.arguments.toString().replace(new RegExp(",", "g"), " ");

			embed.addField(`${command} ${arguments}`, commandObject.description, true);
		}
	}
	message.channel.send({embed});
}

// Export the data to the command handler
exports.properties = properties;
exports.run = run;
