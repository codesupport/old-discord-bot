// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

const config = app.config;
const Discord = app.Discord;

// The code that runs when the event is executed.
function run(message) {
	if (message.content) {
		const logsChannel = message.guild.channels.find((channel) => {
			return channel.id == config.logs_channel;
		});
		const embed = new Discord.RichEmbed();

		embed.setTitle("Message Deleted");
		embed.setDescription(`Author: ${message.author}\nChannel: ${message.channel}`);
		embed.addField("Message", message.content);

		logsChannel.send({embed});
	}
}

// Export the data
exports.run = run;
exports.event = "messageDelete";
