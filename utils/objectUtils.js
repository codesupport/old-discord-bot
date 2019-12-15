/*
 * Utility class for performing Object related logic.
 */

/*
 * Checks if the object is not null or undefined.
 *
 * Parameters:
 * object - The object to check.
 */
function isNull(object) {
	return object === undefined || object === null;
}

/*
 * Returns defaultValue if object is undefined, or just returns object if
 * it is defined.
 *
 * Parameters:
 * object - The object to check.
 * defaultValue - The value to return if object is undefined.
 */
function defaultIfNull(object, defaultValue) {
	return !isNull(object) ? object : defaultValue;
}

exports.defaultIfNull = defaultIfNull;
exports.isNull = isNull;
