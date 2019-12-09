function padZero(number) {
	let stringValue;

	if (number < 10) {
		stringValue = `0${number}`;
	} else {
		stringValue = number;
	}
	return stringValue;
}

function DateFormat(date) {
	this.Y = date.getFullYear();
	this.m = padZero(date.getMonth());
	this.d = padZero(date.getDate());
	this.H = padZero(date.getHours());
	this.i = padZero(date.getMinutes());
	this.s = padZero(date.getSeconds());
}

function format(format, date) {
	let formattedDate = format;

	if (date !== undefined && typeof date.getDate === "function") {
		dateFormat = new DateFormat(date);
		for (const property in dateFormat) {
			formattedDate = formattedDate.replace(property, dateFormat[property]);
		}
	} else {
		throw "date expected to be a Date()";
	}
	return formattedDate;
}

exports.format = format;
