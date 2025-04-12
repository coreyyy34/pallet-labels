import { isValidItem, isValidItemValues, isStringInteger } from "../validation";

describe("isValidItem", () => {
	it("should return true for valid item with numeric quantity", () => {
		const item = { sku: "item1", quantity: 10 };
		expect(isValidItem(item)).toBe(true);
	});

	it("should return true for valid item with string numeric quantity", () => {
		const item = { sku: "item1", quantity: "10" };
		expect(isValidItem(item)).toBe(true);
	});

	it("should return false for item with empty sku", () => {
		const item = { sku: "", quantity: 10 };
		expect(isValidItem(item)).toBe(false);
	});

	it("should return false for item with whitespace-only sku", () => {
		const item = { sku: "   ", quantity: 10 };
		expect(isValidItem(item)).toBe(false);
	});

	it("should return false for item with zero quantity", () => {
		const item = { sku: "item1", quantity: 0 };
		expect(isValidItem(item)).toBe(false);
	});

	it("should return false for item with zero quantity as string", () => {
		const item = { sku: "item1", quantity: "0" };
		expect(isValidItem(item)).toBe(false);
	});

	it("should return false for item with negative quantity", () => {
		const item = { sku: "item1", quantity: -5 };
		expect(isValidItem(item)).toBe(false);
	});

	it("should return false for item with negative quantity as string", () => {
		const item = { sku: "item1", quantity: "-5" };
		expect(isValidItem(item)).toBe(false);
	});

	it("should return false for item with non-integer quantity string", () => {
		const item = { sku: "item1", quantity: "10.5" };
		expect(isValidItem(item)).toBe(false);
	});

	it("should return false for item with non-numeric quantity string", () => {
		const item = { sku: "item1", quantity: "abc" };
		expect(isValidItem(item)).toBe(false);
	});
});

describe("isValidItemValues", () => {
	it("should return true for valid sku and numeric quantity", () => {
		expect(isValidItemValues("item1", 10)).toBe(true);
	});

	it("should return true for valid sku and string numeric quantity", () => {
		expect(isValidItemValues("item1", "10")).toBe(true);
	});

	it("should return true for sku with spaces and valid quantity", () => {
		expect(isValidItemValues("  item1  ", 10)).toBe(true);
	});

	it("should return false for undefined sku", () => {
		expect(isValidItemValues(undefined, 10)).toBe(false);
	});

	it("should return false for empty sku", () => {
		expect(isValidItemValues("", 10)).toBe(false);
	});

	it("should return false for whitespace-only sku", () => {
		expect(isValidItemValues("   ", 10)).toBe(false);
	});

	it("should return false for undefined quantity", () => {
		expect(isValidItemValues("item1", undefined)).toBe(false);
	});

	it("should return false for zero quantity", () => {
		expect(isValidItemValues("item1", 0)).toBe(false);
	});

	it("should return false for zero quantity as string", () => {
		expect(isValidItemValues("item1", "0")).toBe(false);
	});

	it("should return false for negative quantity", () => {
		expect(isValidItemValues("item1", -5)).toBe(false);
	});

	it("should return false for negative quantity as string", () => {
		expect(isValidItemValues("item1", "-5")).toBe(false);
	});

	it("should return false for decimal quantity", () => {
		expect(isValidItemValues("item1", 10.5)).toBe(false);
	});

	it("should return false for decimal quantity as string", () => {
		expect(isValidItemValues("item1", "10.5")).toBe(false);
	});

	it("should return false for non-numeric quantity string", () => {
		expect(isValidItemValues("item1", "abc")).toBe(false);
	});

	it("should return false for empty string quantity", () => {
		expect(isValidItemValues("item1", "")).toBe(false);
	});

	it("should return false for whitespace-only string quantity", () => {
		expect(isValidItemValues("item1", "   ")).toBe(false);
	});
});

describe("isStringInteger", () => {
	it("should return true for integer number", () => {
		expect(isStringInteger(10)).toBe(true);
	});

	it("should return true for integer string", () => {
		expect(isStringInteger("10")).toBe(true);
	});

	it("should return true for zero as number", () => {
		expect(isStringInteger(0)).toBe(true);
	});

	it("should return true for zero as string", () => {
		expect(isStringInteger("0")).toBe(true);
	});

	it("should return true for negative integer as number", () => {
		expect(isStringInteger(-10)).toBe(true);
	});

	it("should return true for negative integer as string", () => {
		expect(isStringInteger("-10")).toBe(true);
	});

	it("should return true for string with plus sign", () => {
		expect(isStringInteger("+10")).toBe(true);
	});

	it("should return true for string with leading/trailing spaces", () => {
		expect(isStringInteger(" 10 ")).toBe(true);
	});

	it("should return false for decimal number", () => {
		expect(isStringInteger(10.5)).toBe(false);
	});

	it("should return false for decimal string", () => {
		expect(isStringInteger("10.5")).toBe(false);
	});

	it("should return false for non-numeric string", () => {
		expect(isStringInteger("abc")).toBe(false);
	});

	it("should return false for empty string", () => {
		expect(isStringInteger("")).toBe(false);
	});

	it("should return false for whitespace-only string", () => {
		expect(isStringInteger("   ")).toBe(false);
	});

	it("should return false for string with spaces between digits", () => {
		expect(isStringInteger("1 0")).toBe(false);
	});
});
