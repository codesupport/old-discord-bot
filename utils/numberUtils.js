/*
 * Utility class for performing Number related logic.
 */

/*
* Checks if passed object is a number.
*
* Parameters:
* object - The object to check.
*/
function isNumber(object) {
	return typeof object === "number";
}

/*
 * Checks if passed object is a positive number.
 *
 * Parameters:
 * object - The object to check.
 */
function isPositiveNumber(object) {
	return isNumber(object) && object >= 0;
}

exports.isNumber = isNumber;
exports.isPositiveNumber = isPositiveNumber;
