"use client";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import type { PalletLabel } from "@/types/types";
import { serialisePalletLabel } from "@/utils/serialiser";
import { isValidItem } from "@/utils/validation";

const usePalletForm = () => {
	const [showNoItemsError, setShowNoItemsError] = useState(false);
	const { control, register, handleSubmit, setValue, reset } =
		useForm<PalletLabel>({
			defaultValues: {
				title: undefined,
				items: [{ sku: "", quantity: undefined }],
			},
		});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});
	const items = useWatch({ control, name: "items" });

	useEffect(() => {
		if (items.length > 0 && items.some((item) => isValidItem(item))) {
			setShowNoItemsError(false);
		}
	}, [items]);

	const onReset = () => {
		// Find the first empty item based on sku and quantity, default to first
		let firstEmptyFieldIndex = items.findIndex(
			(item) =>
				item.sku === "" &&
				(item.quantity === undefined || item.quantity === "")
		);

		if (firstEmptyFieldIndex === -1) {
			firstEmptyFieldIndex = 0;
		}

		// Remove all indexes apart from "firstEmptyFieldIndex"
		const indexesToRemove = fields
			.map((_, idx) => idx)
			.filter((idx) => idx !== firstEmptyFieldIndex);

		remove(indexesToRemove);

		// Reset values for the remaining field
		setValue(`items.0.sku`, "");
		setValue(`items.0.quantity`, "");
	};

	const onSubmit = (data: PalletLabel) => {
		if (!items.some((item) => isValidItem(item))) {
			setShowNoItemsError(true);
			return;
		}

		const serialisedPalletLabel = serialisePalletLabel(data);
		const url = `/print?${serialisedPalletLabel}`;
		window.open(url, "_blank");
	};

	const onDeleteItem = (index: number) => {
		// if there is only 1 field then reset it, otherwise remove it
		if (fields.length === 1) {
			setValue(`items.${index}.sku`, "");
			setValue(`items.${index}.quantity`, "");
			return;
		}
		remove(index);
	};

	const onAddItem = () => {
		append({ sku: "", quantity: "" });
	};

	return {
		showNoItemsError,
		control,
		register,
		handleSubmit,
		setValue,
		fields,
		onReset,
		onSubmit,
		onDeleteItem,
		onAddItem,
	};
};

export default usePalletForm;
