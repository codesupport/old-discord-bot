// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

const config = app.config;
const Discord = app.Discord;

// The code that runs when the event is executed.
function run(oldMessage, newMessage) {
	if (![oldMessage.content, newMessage.content].includes("")) {
		const logsChannel = oldMessage.guild.channels.find((channel) => {
			return channel.id == config.logs_channel;
		});
		const embed = new Discord.RichEmbed();

		embed.setTitle("Message Updated");
		embed.setDescription(`Author: ${oldMessage.author}\nChannel: ${oldMessage.channel}`);
		embed.addField("Old Message", oldMessage.content || ".");
		embed.addField("New Message", newMessage.content || ".");

		logsChannel.send({embed});
	}
}

// Export the data
exports.run = run;
exports.event = "messageUpdate";
