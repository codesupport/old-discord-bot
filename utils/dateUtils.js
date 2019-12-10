/*
 * Utility class for performing various date manipulation logic.
 */

// Dependencies
const NumberUtils = require("./numberUtils.js");

/*
 * Pads the passed string with leading 0's
 *
 * Parameters:
 * object - The object to pad.
 * padding - The amount of padding to add.
 */
function padZero(object, padding) {
	let stringValue;

	if (NumberUtils.isPositiveNumber(padding)) {
		stringValue = `${object}`;

		for (let x = Math.pow(10, padding - 1); x > 1; x /= 10) {
			if (Math.floor(object / x) === 0) {
				stringValue = `0${stringValue}`;
			}
		}
	} else {
		throw `'padding' must be a positive number, (${padding})`;
	}
	return stringValue;
}

/*
 * Used for parsing a date format string and replacing desired values.
 *
 * Parameters:
 * date - The date to parse.
 */
function DateFormat(date) {
	this.Y = date.getFullYear();
	this.m = padZero(date.getMonth(), 2);
	this.d = padZero(date.getDate(), 2);
	this.H = padZero(date.getHours(), 2);
	this.i = padZero(date.getMinutes(), 2);
	this.s = padZero(date.getSeconds(), 2);
	this.S = padZero(date.getMilliseconds(), 3);
}

/*
 * Creates a date string with the passed format for the passed date
 *
 * Parameters:
 * format - The date string format to parse.
 * date - The date to apply to the parsed format string.
 */
function format(format, date) {
	let formattedDate = format;

	if (date !== undefined && typeof date.getDate === "function") {
		dateFormat = new DateFormat(date);
		for (const property in dateFormat) {
			formattedDate = formattedDate.replace(property, dateFormat[property]);
		}
	} else {
		throw "date expected to be a Date()";
	}
	return formattedDate;
}

exports.format = format;
