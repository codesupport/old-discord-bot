/*
 * Utility class for performing array related logic.
 */

/*
 * Checks if the object is an array.
 *
 * Parameters:
 * object - The object to check.
 */
function isArray(object) {
	return typeof object === "object" && object.length !== undefined;
}

/*
 * Checks if the object is an array and is empty.
 *
 * Parameters:
 * object - The object to check.
 */
function isEmpty(object) {
	return isArray(object) && object.length === 0;
}

/*
 * Checks if the object is an array containing the passed object.
 *
 * Parameters:
 * array - The array to check.
 * object - The object to look for.
 */
function contains(array, object) {
	return !isEmpty(array) && array.filter((o) => {
		return o === object;
	}).length > 0;
}

exports.isArray = isArray;
exports.isEmpty = isEmpty;
exports.contains = contains;
