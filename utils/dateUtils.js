/*
 * Utility class for performing various date manipulation logic.
 */

// Dependencies
const NumberUtils = require("./numberUtils.js");
const StringUtils = require("./stringUtils.js");

// Static references
const padString = StringUtils.padString;

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
class DateFormat {
	constructor(date) {
		this.Y = date.getFullYear();
		this.M = monthsOfYear[date.getMonth()];
		this.N = monthsOfYear[date.getMonth()].substr(0, 3);
		this.m = padString(date.getMonth() + 1, -2, 0);
		this.d = padString(date.getDate(), -2, 0);
		this.H = padString(date.getHours(), -2, 0);
		this.h = padString(date.getHours() % 12, -2, 0);
		this.i = padString(date.getMinutes(), -2, 0);
		this.s = padString(date.getSeconds(), -2, 0);
		this.S = padString(date.getMilliseconds(), -3, 0);
		this.o = NumberUtils.ordinal(date.getDate());
		this.a = Math.floor(date.getHours() / 12) > 1 ? "PM" : "AM";
		this.E = daysOfWeek[date.getDay()];
		this.e = daysOfWeek[date.getDay()].substr(0, 3);
	}

	format(formatString) {
		let formattedDate = "";

		for (let i = 0; i < formatString.length; i++) {
			const char = formatString.substr(i, 1);

			formattedDate += this[char] !== undefined ? this[char] : char;
		}
		return formattedDate;
	}
}

/*
 * Creates a date string with the passed format for the passed date
 *
 * Parameters:
 * formatString - The date format string format to parse.
 * date - The date to apply to the parsed format string.
 */
function format(formatString, date) {
	if (date !== undefined && typeof date.getDate === "function") {
		const dateFormat = new DateFormat(date);
		const formattedDate = dateFormat.format(formatString);

		return formattedDate;
	}

	throw "date expected to be a Date()";
}

exports.format = format;
