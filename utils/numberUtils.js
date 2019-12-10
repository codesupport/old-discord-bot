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

/*
 * Returns an ordinal string for the given numberUtils
 *
 * Parameters:
 * object - The number to get an ordinal string for.
 */
function ordinal(object) {
	const ordinalMap = {"1": "st", "2": "nd", "3": "rd", "4": "th", "5": "th", "6": "th", "7": "th", "8": "th", "9": "th", "0": "th"};
	let ordinalValue;

	if (isNumber(object)) {
		if (object == 0) {
			ordinalValue = object;
		} else {
			const stringValue = `${object}`;

			if (stringValue.length > 1 &&
						(stringValue.substr(-2) === "11" || stringValue.substr(-2) === "12")
			) {
				ordinalValue = `${stringValue}th`;
			} else {
				const lastDigit = stringValue.substr(-1);

				ordinalValue = `${stringValue}${ordinalMap[lastDigit]}`;
			}
		}
	} else {
		throw "object must be a numeric type";
	}
	return ordinalValue;
}

exports.isNumber = isNumber;
exports.isPositiveNumber = isPositiveNumber;
exports.ordinal = ordinal;
