const assert = require("assert");
const {isNull, defaultIfNull} = require("../../utils/objectUtils");

describe("utils/objectUtils", () => {
	describe("isNull()", () => {
		it("should return true if null", () => {
			assert.ok(isNull(null));
		});

		it("should return false if not null", () => {
			assert.ok(!isNull({}));
		});
	});

	describe("defaultIfNull()", () => {
		it("returns the default value if null", () => {
			assert.strictEqual(defaultIfNull(null, 0), 0);
		});

		it("returns the actual value if not null", () => {
			assert.strictEqual(defaultIfNull(23, 0), 23);
		});
	});
});