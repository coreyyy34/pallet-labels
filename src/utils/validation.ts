import { Item } from "@/types/types";

export const isValidItem = (item: Item): boolean =>
	isValidItemValues(item.sku, item.quantity);

export const isValidItemValues = (
	sku: string | undefined,
	quantity: string | number | undefined
): boolean =>
	sku !== undefined &&
	quantity !== undefined &&
	sku.trim() !== "" &&
	isStringInteger(quantity) &&
	parseInt(quantity.toString()) > 0;

export const isStringInteger = (value: string | number): boolean => {
	if (value === null || value === undefined) {
		return false;
	}

	if (typeof value === "string") {
		if (value.trim() === "") {
			return false;
		}
	}

	const parsed = Number(value);
	return !isNaN(parsed) && Number.isInteger(parsed);
};
