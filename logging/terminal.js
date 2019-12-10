/*
 * Standard colours used for formatting terminal messages.
 */

const color = {
	red: (stringValue) => {
		return `\x1b[31m${stringValue}\x1b[0m`;
	},

	green: (stringValue) => {
		return `\x1b[32m${stringValue}\x1b[0m`;
	},

	yellow: (stringValue) => {
		return `\x1b[33m${stringValue}\x1b[0m`;
	},

	cyan: (stringValue) => {
		return `\x1b[36m${stringValue}\x1b[0m`;
	}
};

exports.color = color;
