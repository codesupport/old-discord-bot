function isArray(object) {
	return typeof object === "object" && object.length !== undefined;
}

function isEmpty(object) {
	return isArray(object) && object.length === 0;
}

function contains(array, object) {
	return !isEmpty(array) && array.filter((o) => {
		return o === object;
	}).length > 0;
}

exports.isArray = isArray;
exports.isEmpty = isEmpty;
exports.contains = contains;
