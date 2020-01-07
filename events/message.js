// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);
const Log = require(`${_ROOT_DIR}/logging/logging.js`);

const config = app.config;

const User = require(`${_ROOT_DIR}/models/User.js`);
const UserDiscordStats = require(`${_ROOT_DIR}/models/UserDiscordStats.js`);

// The code that runs when the event is executed.

async function run(message) {
	if (message.channel.id === config.showcase_channel) {
		try {
			let userId;

			const users = await User.findAll({
				where: {
					discordId: message.author.id
				}
			});

			if (users.length === 0) {
				userId = users.id;
			} else {
				userId = users[0].id;
			}

			let userStats;

			const usersDiscordStats = await UserDiscordStats.findOrCreate({
				where: { userId }
			});

			if (usersDiscordStats.length === 0) {
				userStats = usersDiscordStats;
			} else {
				userStats = usersDiscordStats[0];
			}

			const monthAgo = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

			if (userStats.lastShowcasePost) {
				if (new Date(userStats.lastShowcasePost) < monthAgo) {
					message.delete();
					message.author.send("You have posted a showcase post in the last 30 days.");

					return;
				}
			}

			await userStats.update({
				lastShowcasePost: new Date().toISOString()
			}, {
				where: {userId}
			});
		} catch (error) {
			message.delete();
			Log.error(error.message);
		}
	}
}

// Export the data
exports.run = run;
exports.event = "message";
