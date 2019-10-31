// Dependencies
const app = require("./../app.js");

const config = app.config;

// The code that runs when the event is executed.
function run(member) {
	if (member.user.avatar) {
		member.addRole(config.roles.member, "Appears to be a valid account.");
	}
}

// Export the data
exports.run = run;