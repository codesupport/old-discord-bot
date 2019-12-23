/*
 * Error code map for error code lookups.
 */

// Dependencies
const {defaultIfNull} = require(`${_ROOT_DIR}/utils/objectUtils.js`);

const errorCodes = {
	"ENOENT": "No such file or directory."
};

/*
 * Gets the description for the provided error code.
 * Returns "Unknown Error Code." if it's not defined.
 *
 * Parameters:
 * errorCode - The associated error code.
 */
function getError(errorCode) {
	return `${errorCode}: ${defaultIfNull(errorCodes[errorCode], "Unknown Error Code")}`;
}

exports.getError = getError;
