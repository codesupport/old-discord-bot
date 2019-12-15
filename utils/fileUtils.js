/*
 * Utility class for performing file related logic.
 */

// Local Dependencies
const fileSystem = require("fs");
const Log = require(`${_ROOT_DIR}/logging/logging.js`);

/*
 * Loads the js files from the given directory.
 *
 * Parameters:
 * directory - The directory to load from.
 */
function loadJsFiles(directory) {
	const targetDirectory = `${_ROOT_DIR}/${directory}`;

	Log.debug(`Loading files from: ${directory}/`);

	return new Promise((resolve, reject) => {
		// Using synchronous read, but wrapped in a promise to make async.
		try {
			const files = fileSystem.readdirSync(targetDirectory);
			const fileList = [];

			Log.debug("Loading files:");
			for (const file of files) {
				fileList.push(require(`${targetDirectory}/${file}`)); // eslint-disable-line global-require
				Log.debug(`+ ${file}`);
			}

			Log.debug(`Files loaded (${fileList.length}): ${directory}/`);
			resolve(fileList);
		} catch (error) {
			Log.error(`Failed to load files from ${targetDirectory}`);
			reject(error);
		}
	});
}

exports.loadJsFiles = loadJsFiles;
