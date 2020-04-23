// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

const config = app.config;

// The code that runs when the event is executed.
function run(reaction, user) {
	if (reaction.message.id == config.authentication_message) {
		if (reaction.emoji.name == "✅") {
			reaction.message.guild.fetchMember(user).then((member) => {
				member.addRole(config.roles.member, "User has authenticated their account.");
			});
		}
	}
}

// Export the data
exports.run = run;
exports.event = "messageReactionAdd";
