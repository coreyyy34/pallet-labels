import { Item, PalletLabel } from "@/types/types";
import { isValidItem, isValidItemValues } from "./validation";

const SKU_PREFIX = "s";
const QUANTITY_PREFIX = "q";

export const serialisePalletLabel = (palletLabel: PalletLabel): string => {
	const params = new URLSearchParams();
	if (palletLabel.title && palletLabel.title.trim() !== "") {
		params.append("title", palletLabel.title.trim());
	}

	let index = 0;
	palletLabel.items.forEach((item) => {
		// Only include items with non empty sku's and quantities greater than 0
		if (isValidItem(item)) {
			params.append(`${SKU_PREFIX}${index}`, item.sku.trim());
			params.append(
				`${QUANTITY_PREFIX}${index}`,
				item.quantity.toString()
			);
			index++;
		}
	});

	return params.toString();
};

export const deserialisePalletLabel = (
	params: URLSearchParams
): PalletLabel => {
	const title = params.get("title") || undefined;
	const items: Item[] = [];

	let index = 0;
	while (true) {
		const sku = params.get(`${SKU_PREFIX}${index}`)?.toString().trim();
		const quantity = params
			.get(`${QUANTITY_PREFIX}${index}`)
			?.toString()
			.trim();

		if (!sku || !quantity || !isValidItemValues(sku, quantity)) break;

		const item = {
			sku: sku,
			quantity: parseInt(quantity),
		};

		// Finally check if the parsed quantity is greater than 0
		if (item.quantity > 0) {
			items.push({
				sku: sku,
				quantity: parseInt(quantity),
			});
		}

		index++;
	}

	return { title, items };
};
