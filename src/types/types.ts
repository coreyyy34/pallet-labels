export interface Item {
	sku: string;
	quantity: string | number;
}

export interface PalletLabel {
	title?: string;
	items: Item[];
}
