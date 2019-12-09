// Dependencies
const app = require("./../app.js");

const Discord = app.Discord;

// Set the command's properties
const properties = {
	command: "hl",
	description: "Get information on how to correctly format a post for #hiring-or-looking.",
	prefix: true,
	arguments: [],
	visible: true,
	botchat: false
};

// The code that runs when the command is executed.
function run(message) {
	const embed = new Discord.RichEmbed();

	embed.setTitle("Hiring or Looking Post Formatting");
	embed.setDescription(`CodeSupport offers a free to use hiring or looking section.\n
						  Here you can find people to work for you and offer your services,
						  as long as it fits in with the rules. If you get scammed in hiring or looking there is
						  nothing we can do, however, we do ask that you let a moderator know.`);
	embed.addField("Example Post", `
		We recommend basing your post on the example below to reduce your risks of it getting removed.\n
		\`\`\`
[HIRING]

Full Stack Website Developer
We are looking for a developer who is willing to bring our video streaming service to life.

Pay: $20/hour
Requirements:
- Solid knowledge of HTML, CSS and JavaScript
- Knowledge of Node.js, Express and EJS.
- Able to turn Adobe XD design documents into working web pages.
- Able to stick to deadlines and work as a team.
		\`\`\`
	`);

	message.channel.send({ embed });
}

// Export the data to the command handler
exports.properties = properties;
exports.run = run;
