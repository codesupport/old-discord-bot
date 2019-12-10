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

const monthsOfYear = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

/*
 * Used for parsing a date format string and replacing desired values.
 *
 * Y - 4 digit year
 * M - Month of year, full spelling (January)
 * N - Month of year, 3 letter abbreviation (Jan)
 * m - 2 digit month (leading 0)
 * d - 2 digit date (leading 0)
 * H - 2 digit hour, 24 hour (leading 0)
 * h - 2 digit hour, 12 hour (leading 0)
 * i - 2 digit minute (leading 0)
 * s - 2 digit second (leading 0)
 * S - 3 digit millisecond (leading 0)
 * o - Ordinal day (1st, 2nd, 3rd, 4th...)
 * a - AM/PM designator
 * E - Day of the week, full spelling (Tuesday)
 * e - Day of the week, 3 letter abbreviation (Tue)
 *
 * Parameters:
 * date - The date to parse.
 */
function DateFormat(date) {
	this.Y = date.getFullYear();
	this.M = monthsOfYear[date.getMonth()];
	this.N = monthsOfYear[date.getMonth()].substr(0, 3);
	this.m = padZero(date.getMonth() + 1, 2);
	this.d = padZero(date.getDate(), 2);
	this.H = padZero(date.getHours(), 2);
	this.h = padZero(date.getHours() % 12, 2);
	this.i = padZero(date.getMinutes(), 2);
	this.s = padZero(date.getSeconds(), 2);
	this.S = padZero(date.getMilliseconds(), 3);
	this.o = NumberUtils.ordinal(date.getDate());
	this.a = Math.floor(date.getHours() / 12) > 1 ? "PM" : "AM";
	this.E = daysOfWeek[date.getDay()];
	this.e = daysOfWeek[date.getDay()].substr(0, 3);
}

/*
 * Creates a date string with the passed format for the passed date
 *
 * Parameters:
 * format - The date string format to parse.
 * date - The date to apply to the parsed format string.
 */
function format(format, date) {
	let formattedDate = "";

	if (date !== undefined && typeof date.getDate === "function") {
		dateFormat = new DateFormat(date);
		for (let i = 0; i < format.length; i++) {
			const char = format.substr(i, 1);

			formattedDate += dateFormat[char] !== undefined ? dateFormat[char] : char;
		}
	} else {
		throw "date expected to be a Date()";
	}
	return formattedDate;
}

exports.format = format;
