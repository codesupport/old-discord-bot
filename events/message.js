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
			const users = await User.findAll({
				where: {
					discordId: message.author.id
				}
			});

			const	userId = users[0].id;
			const usersDiscordStats = await UserDiscordStats.findOrCreate({
				where: { userId }
			});

			const userStats = usersDiscordStats[0];
			const today = new Date();
			const monthAgo = new Date();

			monthAgo.setMonth(today.getMonth() - 1);

			if (userStats.lastShowcasePost) {
				if (new Date(userStats.lastShowcasePost) > monthAgo) {
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
