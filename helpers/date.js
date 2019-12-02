/*
* Get Month
* Returns the word version of the month based on a given month.
* @param {Date} date The date the month is based off of.
* @returns {String} the word version of the month
*/
function getMonth(date) {
	const months = [
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

	return months[date.getMonth()];
}

exports.getMonth = getMonth;