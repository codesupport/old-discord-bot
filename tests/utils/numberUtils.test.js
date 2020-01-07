const assert = require("assert");
const {isNumber, isPositiveNumber, ordinal} = require("../../utils/numberUtils");

describe("utils/numberUtils", () => {
	describe("isNumber()", () => {
		it("should return true if given a number", () => {
			assert.ok(isNumber(1));
		});

		it("should return false if given a string", () => {
			assert.ok(!isNumber("one"));
		});
	});

	describe("isPositiveNumber()", () => {
		it("should return true if given a positive number", () => {
			assert.ok(isPositiveNumber(1));
		});

		it("should return false if given a negative number", () => {
			assert.ok(!isPositiveNumber(-1));
		});
	});

	describe("ordinal()", () => {
		it("should return 1st if given 1", () => {
			assert.strictEqual(ordinal(1), "1st");
		});

		it("should return 2nd if given 2", () => {
			assert.strictEqual(ordinal(2), "2nd");
		});

		it("should throw an error if not given a number", () => {
			assert.throws(() => {
				return ordinal("one");
			});
		});
	});
});