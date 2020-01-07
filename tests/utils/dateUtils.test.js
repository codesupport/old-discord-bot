const path = require("path");

global._ROOT_DIR = path.resolve("");

const assert = require("assert");
const {format} = require("../../utils/dateUtils");

describe("utils/dateUtils", () => {
	describe("format()", () => {
		it("should return 26 October 2016 if given Wed Oct 26 2016 16:54:03 GMT+0000 (GMT)", () => {
			const date = new Date("Wed Oct 26 2016 16:54:03 GMT+0000 (GMT)");

			assert.ok(format("m M Y", date), "26 October 2016");
		});

		it("should throw an error if not given a Date", () => {
			assert.throws(() => {
				format("m M Y", "today's date");
			});
		});
	});
});