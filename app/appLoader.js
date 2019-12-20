/*
 * Application class for managing loading of required app resources.
 */

// Dependencies
const FileUtils = require(`${_ROOT_DIR}/utils/fileUtils.js`);
const Log = require(`${_ROOT_DIR}/logging/logging.js`);
const ErrorCodes = require(`${_ROOT_DIR}/logging/errorCodes.js`);
const {isNull} = require(`${_ROOT_DIR}/utils/objectUtils.js`);

const AppLoader = (() => {
	const publicMethods = {};
	const appProperties = {};
	const loaderCheck = {
		authMessageLoaded: false
	};

	/*
   * Loads the authentication message asynchronously into the client cache.
   */
	function loadAuthenticationMessageAsync() {
		return new Promise((resolve, reject) => {
			const config = appProperties.config;

			const guild = appProperties.client.guilds.find((guildObject) => {
				return guildObject.id == config.guild;
			});

			if (!isNull(guild)) {
				const channel = guild.channels.find((channel) => {
					return channel.id == config.authentication_channel;
				});

				if (!isNull(channel)) {
					try {
						channel.fetchMessage(config.authentication_message)
							.then((message) => {
								resolve(message);
							})
							.catch((error) => {
								Log.error(`${error.name}: ${error.message} (${error.path})`);
								reject(error);
							});
					} catch (error) {
						reject(error);
					}
				} else {
					Log.error("Could not find channel using configured id.");
				}
			} else {
				Log.error("Could not find guild using configured id.");
			}
		});
	}

	/*
   * Loads the authentication message into the client cache.
   */
	function loadAuthenticationMessage() {
		loadAuthenticationMessageAsync()
			.then(() => {
				Log.info("Authorization message loaded.");
				loaderCheck.authMessageLoaded = true;
			}).catch(() => {
				Log.error("Failed to load authorization message.");
			});
	}

	/*
   * Loads the command files into the commands object.
   *
   * Parameters:
   * directory - The directory to look for commands, relative to the project root.
   * commands - The commands object to load with the found commands.
   */
	function loadCommands(directory, commands) {
		FileUtils.loadJsFiles(directory)
			.then((files) => {
				commands.addCommands(files);
				Log.info("Command files loaded.");
			})
			.catch((error) => {
				Log.error(`Failed to load command files(${directory}/): ${ErrorCodes.getError(error.code)}`);
			});
	}

	/*
   * Loads the Event files into the events object.
   *
   * Parameters:
   * directory - The directory to look for events, relative to the project root.
   * events - The events object to load with the found events.
   */
	function loadEvents(directory, events) {
		FileUtils.loadJsFiles(directory)
			.then((files) => {
				events.addEvents(files);
				Log.info("Event files loaded.");
			})
			.catch((error) => {
				Log.error(`Failed to load Event files(${directory}/): ${ErrorCodes.getError(error.code)}`);
			});
	}

	/*
   * Checks to see if all required client resources have loaded after a
   * given amoutn of time, and throws an error if not.
   *
   * Parameters:
   * milliseconds - Amount of time to wait for resources before throwing an error.
   */
	function successfulLoadTimeoutCheck(milliseconds) {
		setTimeout(() => {
			if (loaderCheck.authMessageLoaded) {
				Log.info("Client resources all loaded.");
				return;
			} else {
				Log.error("Failed to acquire authorization message.");
			}
			throw `Failed to load required all resources within ${milliseconds} millseconds.`;
		}, milliseconds);
	}

	/*
   * Sets the client object to be used internally.
   */
	publicMethods.setClient = (client) => {
		appProperties.client = client;
	};

	/*
   * Sets the config object to be used internally.
   */
	publicMethods.setConfig = (config) => {
		appProperties.config = config;
	};

	/*
   * Loads the required resources for the application.
   */
	publicMethods.loadResources = (resources) => {
		const config = appProperties.config;

		Log.debug("Loading resources...");
		successfulLoadTimeoutCheck(3000);
		loadAuthenticationMessage();
		loadCommands(config.commands_directory, resources.commands);
		loadEvents(config.events_directory, resources.events);
	};

	return publicMethods;
})();

exports.setClient = AppLoader.setClient;
exports.setConfig = AppLoader.setConfig;
exports.loadResources = AppLoader.loadResources;
