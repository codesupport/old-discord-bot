/*
 * Utility class for performing String related logic.
 */

// Dependencies
const ArrayUtils = require("./arrayUtils.js");

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

		if (ArrayUtils.isArray(matchResult)) {
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

exports.isEmpty = isEmpty;
exports.match = match;
