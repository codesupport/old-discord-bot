/* eslint-disable */
// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

const config = app.config;

// The code that runs when the event is executed.
function run(member) {
	const currentDate = Date.now();
	const memberCreatedDate = member.user.createdAt.getTime();
	const dateDifference = currentDate - memberCreatedDate;

	// Check that the member has an avatar and their account is at least 30 days old.
	//if (member.user.avatar && dateDifference / 2592000000 > 1) {
	//	member.addRole(config.roles.member, "Appears to be a valid account.");
	//}
}

// Export the data
exports.run = run;
exports.event = "guildMemberAdd";
