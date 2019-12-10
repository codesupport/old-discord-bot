/*
 * Standard colours used for formatting terminal messages.
 */

const color = {
	red: (stringValue) => {
		return `\x1b[31m${stringValue}\x1b[37m`;
	},

	green: (stringValue) => {
		return `\x1b[32m${stringValue}\x1b[37m`;
	},

	yellow: (stringValue) => {
		return `\x1b[33m${stringValue}\x1b[37m`;
	},

	cyan: (stringValue) => {
		return `\x1b[36m${stringValue}\x1b[37m`;
	}
};

exports.color = color;
