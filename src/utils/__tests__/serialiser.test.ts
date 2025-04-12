import { deserialisePalletLabel, serialisePalletLabel } from "../serialiser";

describe("serialisePalletLabel", () => {
	/* title tests */
	it("should exclude title when undefined", () => {
		const palletLabel = {
			title: undefined,
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "item2", quantity: 5 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe("s0=item1&q0=10&s1=item2&q1=5");
	});

	it("should trim excess spaces from title", () => {
		const palletLabel = {
			title: "   Excess Spaces   ",
			items: [{ sku: "item1", quantity: 10 }],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe("title=Excess+Spaces&s0=item1&q0=10");
	});

	it("should exclude title when it contains only whitespace", () => {
		const palletLabel = {
			title: "   ",
			items: [{ sku: "item1", quantity: 10 }],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe("s0=item1&q0=10");
	});

	it("should return only title when items array is empty", () => {
		const palletLabel = {
			title: "Empty Items",
			items: [],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe("title=Empty+Items");
	});

	/* items tests */
	it("should serialize a valid PalletLabel with title and items", () => {
		const palletLabel = {
			title: "Sample Pallet",
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "item2", quantity: 5 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe("title=Sample+Pallet&s0=item1&q0=10&s1=item2&q1=5");
	});

	it("should ignore items with empty SKU", () => {
		const palletLabel = {
			title: "Filtered Pallet",
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "", quantity: 5 }, // invalid - empty sku
				{ sku: "item3", quantity: 20 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe(
			"title=Filtered+Pallet&s0=item1&q0=10&s1=item3&q1=20"
		);
	});

	it("should ignore items with whitespace-only SKU", () => {
		const palletLabel = {
			title: "Filtered Pallet",
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "   ", quantity: 5 }, // invalid - whitespace-only sku
				{ sku: "item3", quantity: 20 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe(
			"title=Filtered+Pallet&s0=item1&q0=10&s1=item3&q1=20"
		);
	});

	it("should ignore items with zero quantity", () => {
		const palletLabel = {
			title: "Filtered Pallet",
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "item2", quantity: 0 }, // invalid - zero quantity
				{ sku: "item3", quantity: 20 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe(
			"title=Filtered+Pallet&s0=item1&q0=10&s1=item3&q1=20"
		);
	});

	it("should ignore items with negative quantity", () => {
		const palletLabel = {
			title: "Filtered Pallet",
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "item2", quantity: -5 }, // invalid - negative quantity
				{ sku: "item3", quantity: 20 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe(
			"title=Filtered+Pallet&s0=item1&q0=10&s1=item3&q1=20"
		);
	});

	it("should trim excess spaces from SKUs", () => {
		const palletLabel = {
			title: "Trimmed Pallet",
			items: [
				{ sku: "   item1   ", quantity: 10 },
				{ sku: " item2 ", quantity: 5 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe(
			"title=Trimmed+Pallet&s0=item1&q0=10&s1=item2&q1=5"
		);
	});

	it("should handle a large number of items", () => {
		const items = Array.from({ length: 100 }, (_, index) => ({
			sku: `item${index}`,
			quantity: index + 1,
		}));
		const palletLabel = { title: "Large Pallet", items };

		const result = serialisePalletLabel(palletLabel);
		expect(result).toContain("title=Large+Pallet&s0=item0&q0=1");
		expect(result).toContain("s99=item99&q99=100");
	});

	it("should handle numeric quantity values", () => {
		const palletLabel = {
			title: "Numeric Quantity Pallet",
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "item2", quantity: 5 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe(
			"title=Numeric+Quantity+Pallet&s0=item1&q0=10&s1=item2&q1=5"
		);
	});

	it("should convert string quantity values to strings", () => {
		const palletLabel = {
			title: "String Quantity Pallet",
			items: [
				{ sku: "item1", quantity: "10" },
				{ sku: "item2", quantity: "5" },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toBe(
			"title=String+Quantity+Pallet&s0=item1&q0=10&s1=item2&q1=5"
		);
	});

	it("should handle special characters in title and SKUs", () => {
		const palletLabel = {
			title: "Special & Characters!",
			items: [
				{ sku: "item/1", quantity: 10 },
				{ sku: "item&2", quantity: 5 },
			],
		};

		const result = serialisePalletLabel(palletLabel);
		expect(result).toContain("title=Special+%26+Characters");
		expect(result).toContain("s0=item%2F1&q0=10");
		expect(result).toContain("s1=item%262&q1=5");
	});
});

describe("deserialisePalletLabel", () => {
	/* title tests */
	it("should include title when present in params", () => {
		const params = new URLSearchParams(
			"title=Sample+Pallet&s0=item1&q0=10"
		);
		const result = deserialisePalletLabel(params);
		expect(result.title).toBe("Sample Pallet");
	});

	it("should set title to undefined when not present in params", () => {
		const params = new URLSearchParams("s0=item1&q0=10");
		const result = deserialisePalletLabel(params);
		expect(result.title).toBeUndefined();
	});

	it("should set title to undefined when empty in params", () => {
		const params = new URLSearchParams("title=&s0=item1&q0=10");
		const result = deserialisePalletLabel(params);
		expect(result.title).toBeUndefined();
	});

	it("should handle special characters in title", () => {
		const params = new URLSearchParams(
			"title=Special+%26+Characters%21&s0=item1&q0=10"
		);
		const result = deserialisePalletLabel(params);
		expect(result.title).toBe("Special & Characters!");
	});

	/* items tests */
	it("should deserialize a valid query string into a PalletLabel", () => {
		const params = new URLSearchParams(
			"title=Sample+Pallet&s0=item1&q0=10&s1=item2&q1=5"
		);
		const result = deserialisePalletLabel(params);
		expect(result).toEqual({
			title: "Sample Pallet",
			items: [
				{ sku: "item1", quantity: 10 },
				{ sku: "item2", quantity: 5 },
			],
		});
	});

	it("should return empty items array when no items in params", () => {
		const params = new URLSearchParams("title=Empty+Items");
		const result = deserialisePalletLabel(params);
		expect(result).toEqual({
			title: "Empty Items",
			items: [],
		});
	});

	it("should stop parsing items at the first missing or invalid item", () => {
		const params = new URLSearchParams("s0=item1&q0=10&s2=item3&q2=20");
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should skip items with missing SKU parameter", () => {
		const params = new URLSearchParams(
			"s0=item1&q0=10&q1=5&s2=item3&q2=20"
		);
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should skip items with missing quantity parameter", () => {
		const params = new URLSearchParams(
			"s0=item1&q0=10&s1=item2&s2=item3&q2=20"
		);
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should trim excess spaces from SKUs", () => {
		const params = new URLSearchParams("s0=+item1+&q0=10&s1=+item2+&q1=5");
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([
			{ sku: "item1", quantity: 10 },
			{ sku: "item2", quantity: 5 },
		]);
	});

	it("should skip items with empty SKU after trimming", () => {
		const params = new URLSearchParams(
			"s0=item1&q0=10&s1=++&q1=5&s2=item3&q2=20"
		);
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should skip items with non-integer quantity", () => {
		const params = new URLSearchParams(
			"s0=item1&q0=10&s1=item2&q1=abc&s2=item3&q2=20"
		);
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should skip items with zero quantity", () => {
		const params = new URLSearchParams(
			"s0=item1&q0=10&s1=item2&q1=0&s2=item3&q2=20"
		);
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should skip items with negative quantity", () => {
		const params = new URLSearchParams(
			"s0=item1&q0=10&s1=item2&q1=-5&s2=item3&q2=20"
		);
		const result = deserialisePalletLabel(params);
		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should handle a large number of items", () => {
		const paramsObj: Record<string, string> = { title: "Large Pallet" };
		for (let i = 0; i < 100; i++) {
			paramsObj[`s${i}`] = `item${i}`;
			paramsObj[`q${i}`] = `${i + 1}`;
		}

		const params = new URLSearchParams(paramsObj);
		const result = deserialisePalletLabel(params);

		expect(result.title).toBe("Large Pallet");
		expect(result.items.length).toBe(100);
		expect(result.items[0]).toEqual({ sku: "item0", quantity: 1 });
		expect(result.items[99]).toEqual({ sku: "item99", quantity: 100 });
	});

	it("should parse string quantities as integers", () => {
		const params = new URLSearchParams("s0=item1&q0=10&s1=item2&q1=5");
		const result = deserialisePalletLabel(params);

		expect(result.items).toEqual([
			{ sku: "item1", quantity: 10 },
			{ sku: "item2", quantity: 5 },
		]);

		// Verify types
		expect(typeof result.items[0].quantity).toBe("number");
		expect(typeof result.items[1].quantity).toBe("number");
	});

	it("should handle special characters in SKUs", () => {
		const params = new URLSearchParams(
			"s0=item%2F1&q0=10&s1=item%262&q1=5"
		);
		const result = deserialisePalletLabel(params);

		expect(result.items).toEqual([
			{ sku: "item/1", quantity: 10 },
			{ sku: "item&2", quantity: 5 },
		]);
	});

	it("should handle spaces in quantity values", () => {
		const params = new URLSearchParams("s0=item1&q0=+10+&s1=item2&q1=+5+");
		const result = deserialisePalletLabel(params);

		expect(result.items).toEqual([
			{ sku: "item1", quantity: 10 },
			{ sku: "item2", quantity: 5 },
		]);
	});

	it("should handle non-sequential item indices", () => {
		const params = new URLSearchParams("s0=item1&q0=10&s5=item5&q5=50");
		const result = deserialisePalletLabel(params);

		expect(result.items).toEqual([{ sku: "item1", quantity: 10 }]);
	});

	it("should handle completely empty URLSearchParams", () => {
		const params = new URLSearchParams();
		const result = deserialisePalletLabel(params);

		expect(result).toEqual({
			title: undefined,
			items: [],
		});
	});
});
