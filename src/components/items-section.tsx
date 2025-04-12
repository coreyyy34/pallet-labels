"use client";

import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import Button from "./button";
import type { PalletLabel } from "@/types/types";
import ErrorMessage from "./error-message";
import ItemRow from "./item-row";

interface ItemsSectionProps {
	showNoItemsError: boolean;
	register: UseFormRegister<PalletLabel>;
	fields: FieldArrayWithId<PalletLabel, "items", "id">[];
	onDeleteItem: (index: number) => void;
	onAddItem: () => void;
}

export default function ItemsSection({
	showNoItemsError,
	register,
	fields,
	onDeleteItem,
	onAddItem,
}: ItemsSectionProps) {
	return (
		<>
			<AnimatePresence initial={false}>
				{fields.map((field, index) => (
					<ItemRow
						key={field.id}
						index={index}
						register={register}
						onDelete={onDeleteItem}
					/>
				))}
			</AnimatePresence>

			<AnimatePresence initial={false}>
				{showNoItemsError && (
					<ErrorMessage message="There must be at least 1 valid item" />
				)}
			</AnimatePresence>

			<div className="space-y-4">
				<Button
					type="button"
					variant="secondary"
					className="w-full"
					onClick={onAddItem}
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Item
				</Button>
			</div>
		</>
	);
}
