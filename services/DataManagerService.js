const axios = require("axios");
const Log = require(`${_ROOT_DIR}/logging/logging.js`);

class DataManagerService {
	async saveMemberflow(joined, left, count) {
		try {
			const {DATA_MANAGER_URL, DATA_MANAGER_TOKEN} = process.env;

			await axios.post(`${DATA_MANAGER_URL}?token=${DATA_MANAGER_TOKEN}`, {
				date: new Date().toISOString(),
				joined,
				left,
				count
			});
		} catch (error) {
			Log.error(error);
		}
	}
}

module.exports = new DataManagerService();