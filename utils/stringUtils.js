/*
 * Utility class for performing String related logic.
 */

// Dependencies
const {isNumber} = require("./numberUtils.js");

/*
 * Checks if the object is a string.
 *
 * Parameters:
 * object - The object to check.
 */
function isString(object) {
	return typeof object === "string";
}

/*
 * Checks if the object is null or an empty string.
 *
 * Parameters:
 * object - The object to check.
 */
function isEmpty(object) {
	return object === undefined ||
    isString(object) && object.trim() === "";
}

/*
 * Performs a regex match on the string, returning a matcher.
 *
 * A matcher has a isMatch property identifying if a match was found, handler
 * a match property, that holds the match results if a match was found.
 *
 * Parameters:
 * regex - The regex pattern to match.
 * object - The object to match against.
 */
function match(regex, object) {
	const matcher = {};

	if (typeof object === "string") {
		const matchResult = object.match(regex);

		if (Array.isArray(matchResult)) {
			matcher.isMatch = true;
			matcher.match = matchResult;
		} else {
			matcher.isMatch = false;
		}
	} else {
		throw "Passed object was not a string";
	}
	return matcher;
}

/*
 * Pads the passed string with leading/ensuing chars
 *
 * Parameters:
 * object - The object to pad. Can be string|number.
 * padding - The amount of padding to add. Negative pads left, positive pads right.
 * char - The character to pad with.
 */
function padString(object, padding, char) {
	let stringValue;

	if (!isEmpty(object) || isNumber(object)) {
		if (isNumber(padding)) {
			if (!isEmpty(char) || isNumber(char)) {
				const stringLengthMultiplier = Math.pow(10, `${object}`.length - 1);
				const absPadding = Math.abs(padding);

				stringValue = `${object}`;
				for (let x = Math.pow(10, absPadding - 1); x > 1; x /= 10) {
					if (Math.floor(stringLengthMultiplier / x) === 0) {
						stringValue = padding < 0 ? `${char}${stringValue}` : `${stringValue}${char}`;
					}
				}
			} else {
				throw "'char' must be a string or a number.";
			}
		} else {
			throw "'padding' must be a number.";
		}
	} else {
		throw "'object' must be a string or a number.";
	}

	return stringValue;
}

exports.isEmpty = isEmpty;
exports.match = match;
exports.padString = padString;
