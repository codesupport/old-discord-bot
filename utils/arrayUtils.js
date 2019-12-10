/*
 * Utility class for performing array related logic.
 */

/*
 * Checks if the object is an array and is empty.
 * Returns true if empty array or if it is not an array.
 *
 * Parameters:
 * object - The object to check.
 */
function isEmpty(object) {
	return !Array.isArray(object) || object.length === 0;
}

/*
 * Checks if the object is an array containing the passed object.
 *
 * Parameters:
 * array - The array to check.
 * object - The object to look for.
 */
function contains(array, object) {
	return !isEmpty(array) && array.includes(object);
}

exports.isEmpty = isEmpty;
exports.contains = contains;
