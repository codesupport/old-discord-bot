// Dependencies
const app = require("./../app.js");

const Discord = app.Discord;

// Set the command's properties
const properties = {
	command: "info",
	description: "Basic information about server and bot.",
	prefix: true,
	arguments: [],
	visible: true,
	botchat: false
};

// The code that runs when the command is executed.
function run(message) {
  const embed = new Discord.RichEmbed()
  .setTitle("Information")
  .setField("About CodeSupport", "CodeSupport is a discord community with over 5,000 members\ndedicated to helping people in learning how to code.")
  .setField("Credits", "CodeSupport was founded in 2016 by LamboCreeper, also known as Lambo.")
  .setThumbnail(app.client.user.avatarURL);
	message.channel.send(embed);
}

// Export the data to the command handler
exports.properties = properties;
exports.run = run;
