/*
 * Application class for managing Command processes.
 */

// Local Dependencies
const config = require(`${_ROOT_DIR}/config.json`);
const StringUtils = require(`${_ROOT_DIR}/utils/stringUtils.js`);
const {defaultIfNull, isNull} = require(`${_ROOT_DIR}/utils/objectUtils.js`);
const Log = require(`${_ROOT_DIR}/logging/logging.js`);

const Commands = (() => {
	/*
   * Validate that the command file is proper format
   *
   * Parameters:
   * commandFile - The exported contents of the command file to validate.
   */
	function validate(commandFile) {
		let isValid = true;

		if (!isNull(commandFile.properties)) {
			const properties = commandFile.properties;

			if (StringUtils.isEmpty(properties.command)) {
				Log.error("Command file has no defined command.");
				isValid = false;
			}

			if (StringUtils.isEmpty(properties.description)) {
				Log.error("Command file has no defined description.");
				isValid = false;
			}

			if (typeof defaultIfNull(properties.hasPrefix, false) !== "boolean") {
				Log.error("Command file's hasPrefix property is invalid.");
				isValid = false;
			}

			if (typeof defaultIfNull(properties.isBotChat, false) !== "boolean") {
				Log.error("Command file's isBotChat property is invalid.");
				isValid = false;
			}

			if (typeof defaultIfNull(properties.isVisible, false) !== "boolean") {
				Log.error("Command file's isVisible property is invalid.");
				isValid = false;
			}

			if (!Array.isArray(defaultIfNull(properties.arguments, []))) {
				Log.error("Command file's arguments property is invalid.");
				isValid = false;
			}
		} else {
			Log.error("Command file has no defined properties.");
			isValid = false;
		}

		if (typeof commandFile.run !== "function") {
			Log.error("Command file has no defined run function.");
			isValid = false;
		}

		return isValid;
	}

	const publicMethods = {};
	const commands = {};

	/*
   * Add a Command to the commands object
   *
   * Parameters:
   * commandFile - The exported contents of the command file to add.
   */
	function addCommand(commandFile) {
		if (validate(commandFile)) {
			const properties = commandFile.properties;
			const command = defaultIfNull(properties.hasPrefix, false) ? `${config.prefix}${properties.command}` : properties.command;

			if (isNull(commands[command])) {
				const arguments = defaultIfNull(properties.arguments, []);

				commands[command] = {
					description: properties.description,
					isBotChat: defaultIfNull(properties.isBotChat, false),
					isVisible: defaultIfNull(properties.isVisible, false),
					arguments: arguments,
					hasArguments: arguments.length > 0,
					run: commandFile.run
				};
			} else {
				Log.error(`Command '${command}' in ${file} has already been previously defined.`);
				throw `Command '${command}' in ${file} has already been previously defined.`;
			}
		} else {
			Log.error(`Command file ${file} is invalid.`);
			throw `Command file ${file} is invalid.`;
		}
	}

	/*
	 * Add Commands from an array of command file exported contents.
	 *
	 * Parameters:
	 * commandFiles - The array of exported contents of the command files to add.
	 */
	publicMethods.addCommands = (commandFiles) => {
		for (const i in commandFiles) {
			addCommand(commandFiles[i]);
		}
	};

	/*
   * Checks if the given command exists in the command object.
   *
   * Parameters:
   * command - The Command to check for existance.
   */
	publicMethods.hasCommand = (command) => {
		return !isNull(commands[command]);
	};

	/*
	 * Get a Command from the commands object.
	 *
	 * Parameters:
	 * command - The Command to get.
	 */
	publicMethods.getCommand = (command) => {
		return commands[command];
	};

	/*
   * Get all Commands from the commands object.
   */
	publicMethods.getCommands = () => {
		return commands;
	};

	return publicMethods;
})();

exports.addCommands = Commands.addCommands;
exports.hasCommand = Commands.hasCommand;
exports.getCommand = Commands.getCommand;
exports.getCommands = Commands.getCommands;
