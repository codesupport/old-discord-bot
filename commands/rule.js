// Dependencies
const app = require("./../app.js");

const Discord = app.Discord;

// Set the command's properties
const properties = {
	command: "rule",
	description: "Shows a rule based on the number given.",
	prefix: true,
	arguments: ["<rule number>"],
	visible: true,
	botchat: false
};

// The code that runs when the command is executed.
function run(message, args) {
	if (typeof args[1] == "undefined") {
		const embed = new Discord.RichEmbed();

		embed.setTitle("Error");
		embed.setDescription("You must define a rule number.");
		embed.addField("Correct Usage", "?rule <rule number>");

		message.chanenl.send({embed});
	} else {
		const rules = {
			"1|ask": "Actually ask your question, don't just ask for \"help\".",
			"2|work": "Don't ask why your code doesn't \"work\".",
			"3|responses": "Responses to your questions are not guaranteed. The people here offer their expertise on their own time and for free.",
			"4|pinging": "Do not ping a user or group regarding coding help unless you are responding to them in an existing conversation.",
			"5|clean": "Keep it clean; some people use this at work/school.",
			"6|privacy": "Don't share private information with anyone! (you’re just asking to be hacked)",
			"7|advertising": "Don't advertise, it's as simple as that.",
			"8|channel": "Stick to the appropriate channels. Feel free to ask in [#general](https://discord.gg/qZfADKn) if you're not sure where to ask something.",
			"9|codeblock": "When posting code, please use code blocks (see `!codeblock` for help).",
			"10|bot": "Don't ask for your bot to be added. It won’t be.",
			"11|verified": "Don't ask to become Verified: doing so will make it less likely.",
			"12|dms": "Don't DM people (unless it's for #hiring-or-looking), the knowledge shared here is for the benefit of everyone.",
			"13|illegal": "Don't ask for help with illegal or immoral tasks. Doing so not only risks your continued participation in this community but is in violation of Discord's TOS and can get your account banned.",
			"14|spoon": "No spoon-feeding, it's not useful and won't help anyone learn."
		};

		for (const rule in rules) {
			const ruleTriggers = rule.split("|");

			if (ruleTriggers.includes(args[1])) {
				const embed = new Discord.RichEmbed();

				embed.setTitle(`Rule ${args[1]}`);
				embed.setDescription(rules[rule]);

				message.channel.send({embed});
			}
		}
	}
}

// Export the data to the command handler
exports.properties = properties;
exports.run = run;