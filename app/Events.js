/*
 * Application class for managing Event processes.
 */

// Local Dependencies
const StringUtils = require(`${_ROOT_DIR}/utils/stringUtils.js`);
const Log = require(`${_ROOT_DIR}/logging/logging.js`);
const {isNull} = require(`${_ROOT_DIR}/utils/objectUtils.js`);

const Events = (() => {
	/*
   * Validate that the event file is proper format
   *
   * Parameters:
   * eventFile - The exported contents of the event file to validate.
   */
	function validate(eventFile) {
		let isValid = true;

		if (StringUtils.isEmpty(eventFile.event)) {
			Log.error("Event file has no defined event type.");
			isValid = false;
		}

		if (typeof eventFile.run !== "function") {
			Log.error("Event file has no defined run function.");
			isValid = false;
		}
		return isValid;
	}

	const publicMethods = {};
	const events = {};

	/*
   * Add an Event to the events object
   *
   * Parameters:
   * eventFile - The exported contents of the event file to add.
   */
	function addEvent(eventFile) {
		if (validate(eventFile)) {
			events[eventFile.event] = {
				run: eventFile.run
			};
		} else {
			Log.error(`Command file ${file} is invalid.`);
			throw `Command file ${file} is invalid.`;
		}
	}

	/*
   * Checks if the given event exists in the command object.
   *
   * Parameters:
   * eventName - The Event to check for existance.
   */
	publicMethods.hasEvent = (eventName) => {
		return !isNull(events[eventName]);
	};

	/*
   * Add Events from an array of event file exported contents.
   *
   * Parameters:
   * eventFiles - The array of exported contents of the event files to add.
   */
	publicMethods.addEvents = (eventFiles) => {
		for (const i in eventFiles) {
			addEvent(eventFiles[i]);
		}
	};

	/*
   * Get an Event from the events object.
   *
   * Parameters:
   * eventName - The Event to get.
   */
	publicMethods.getEvent = (eventName) => {
		let eventObject;

		if (publicMethods.hasEvent(eventName)) {
			eventObject = events[eventName];
		} else {
			Log.error(`Event '${eventName}' was not found.`);
			eventObject = {
				run: (...objects) => { // eslint-disable-line no-unused-vars
					// Do nothing, just don't crash the bot.
				}
			};
		}
		return eventObject;
	};

	return publicMethods;
})();

exports.hasEvent = Events.hasEvent;
exports.addEvents = Events.addEvents;
exports.getEvent = Events.getEvent;
