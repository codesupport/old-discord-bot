/*
 * Environment Variables:
 * LOG_LEVEL - Sets the base log level to output.
 * LOG_PATTERN - Sets the log output format.
 *
 * Log Levels:
 * DEBUG, INFO, WARN, ERROR
 * Setting LOG_LEVEL to INFO will cause INFO, WARN, ERROR to show, but not DEBUG logLevels.
 *
 * Log Pattern:
 * Ex: %d{Y/m/d H:i:s} [%l] %s
 * Output: 2019/12/12 20:40:01 [DEBUG] Logging message to display
 * %d{} - Adds date with format specified within {} brackets.
 * %l - Adds the log level, optional padding can be specified with %-#l or %+#l
 *      where - means pad left, + means pad right, and # is a numeric value
 *      for specifying the amount of padding.
 * %s - Adds the log message itself to the log output.
 */

// Dependencies
const ArrayUtils = require("../utils/arrayUtils.js");
const DateUtils = require("../utils/dateUtils.js");
const StringUtils = require("../utils/stringUtils.js");
const Terminal = require("./terminal.js");

/*
 * Color pallet used for setting log level colours.
 */
const colorPallet = {
	error: Terminal.color.red,
	warn: Terminal.color.yellow,
	info: Terminal.color.cyan,
	debug: Terminal.color.green
};

const logLevels = ["DEBUG", "INFO", "WARN", "ERROR"];
const logLevelIndex = {"DEBUG": 0, "INFO": 1, "WARN": 2, "ERROR": 3};
let loggerLogLevel = "DEBUG";
let loggerPattern = "[%d{Y-m-d H:i:s.S}] | %-5l | %s";

/*
 * Replaces the date placeholder in the passed format.
 *
 * Parameters:
 * logFormat - The log format string to parse.
 */
function formatDate(logFormat) {
	let logValue = logFormat;
	const matcher = StringUtils.match("%d\{(.*)\}", logFormat);

	if (matcher.isMatch === true) {
		const dateFormatRegex = matcher.match[0];
		const dateFormat = matcher.match[1];

		logValue = logValue.replace(dateFormatRegex, DateUtils.format(dateFormat, new Date()));
	}
	return logValue;
}

/*
 * Replaces the log level placeholder in the passed format.
 *
 * Parameters:
 * logFormat - The log format string to parse.
 * level - The log level to inject.
 */
function formatLevel(logFormat, level) {
	let logValue = logFormat;
	const matcher = StringUtils.match("%([+-]\\d+)?l", logValue);

	if (matcher.isMatch === true) {
		const levelRegex = matcher.match[0];
		const levelPadding = matcher.match[1];

		if (levelPadding !== undefined) {
			const padAmount = levelPadding.substr(1);

			logValue = logValue.replace(
				levelRegex,
				levelPadding.substr(0, 1) === "+" ? colorPallet[level.toLowerCase()](level.padEnd(padAmount)) : colorPallet[level.toLowerCase()](level.padStart(padAmount))
			);
		}
		logValue.replace("%s", level);
	}
	return logValue;
}

/*
 * Replaces the message placeholder in the passed format.
 *
 * Parameters:
 * logFormat - The log format string to parse.
 * message - The message to inject.
 */
function formatMessage(logFormat, message) {
	let logValue = logFormat;

	logValue = logValue.replace("%s", message);
	return logValue;
}

/*
 * Parses the format, replacing placeholders with desired values.
 *
 * Parameters:
 * logFormat - The log format string to parse.
 * logObject - The logObject to inject.
 */
function format(logFormat, logObject) {
	let logValue = formatDate(logFormat);

	logValue = formatLevel(logValue, logObject.level);
	logValue = formatMessage(logValue, logObject.message);
	return logValue;
}

/*
 * Gets the index of the passed log level.
 *
 * Parameters:
 * level - The level you want the associated index for.
 */
function logIndex(level) {
	let index;

	if (level === undefined) {
		index = logLevelIndex[loggerLogLevel];
	} else {
		index = logLevelIndex[level];
	}
	return index;
}

/*
 * Basic log function, used only internally.
 *
 * Parameters:
 * level - The log level associated with the message.
 * object - The log object to log. Accepts string|number|boolean
 */
function log(level, object) {
	const printableTypes = ["string", "number", "boolean"];
	const logObject = {level, message: object};

	if (ArrayUtils.contains(printableTypes, typeof object)) {
		console.log(
			format(loggerPattern, logObject),
			// `[${DateUtils.format("Y-m-d H:i:s", new Date())}] |${colorPallet[level.toLowerCase()](level.padEnd(5))}| %s`,
			object
		);
	} else {
		throw "Cannot log objects of this type.";
	}
}

/*
 * For logging DEBUG level messages.
 *
 * Parameters:
 * object - The object to log.
 */
function debug(object) {
	if (logIndex() <= logIndex("DEBUG")) {
		log("DEBUG", object);
	}
}

/*
 * For logging INFO level messages.
 *
 * Parameters:
 * object - The object to log.
 */
function info(object) {
	if (logIndex() <= logIndex("INFO")) {
		log("INFO", object);
	}
}

/*
 * For logging WARN level messages.
 *
 * Parameters:
 * object - The object to log.
 */
function warn(object) {
	if (logIndex() <= logIndex("WARN")) {
		log("WARN", object);
	}
}

/*
 * For logging ERROR level messages.
 *
 * Parameters:
 * object - The object to log.
 */
function error(object) {
	if (logIndex() <= logIndex("ERROR")) {
		log("ERROR", object);
	}
}

/*
 * Checks to see if the LOG_LEVEL environment variable has been set.
 */
if (process.env.LOG_LEVEL !== undefined) {
	const logLevel = process.env.LOG_LEVEL;

	if (ArrayUtils.contains(logLevels, logLevel)) {
		loggerLogLevel = logLevel;
	} else {
		warn(`Log level invalid, defaulting to ${colorPallet[loggerLogLevel.toLowerCase()](loggerLogLevel)}`);
	}
} else {
	info(`Log level not set, defaulting to ${colorPallet[loggerLogLevel.toLowerCase()](loggerLogLevel)}`);
}

/*
 * Checks to see if the LOG_PATTERN environment variable has been set.
 */
if (typeof process.env.LOG_PATTERN === "string") {
	loggerPattern = process.env.LOG_PATTERN;
} else {
	info(`Log pattern not set, defaulting to ${loggerPattern}`);
}

exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;
