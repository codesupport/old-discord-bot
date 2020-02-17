const cron = require("node-cron");

const config = require("../config.json");
const Log = require("../logging/logging");
const {saveMemberflow} = require("../services/DataManagerService");

let joined;

module.exports = (client) => {
	joined = client.memberCount;

	cron.schedule("* * * * *", async () => {
		joined = client.memberCount - joined;

		Log.info("Saving Memberflow.");
		const guild = client.guilds.find((g) => {
			return g.id === config.guild;
		});

		const members = guild.memberCount;

		await saveMemberflow(joined, null, members);
	}, {}).start();
};