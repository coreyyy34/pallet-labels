"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import Input from "./input";
import Button from "./button";
import type { PalletLabel } from "@/types/types";

interface ItemRowProps {
	index: number;
	register: UseFormRegister<PalletLabel>;
	onDelete: (index: number) => void;
}

const itemAnimationVariants = {
	initial: { opacity: 0, height: 0, marginBottom: 0 },
	animate: { opacity: 1, height: "auto", marginBottom: "1rem" },
	exit: { opacity: 0, height: 0, marginBottom: 0 },
	transition: { duration: 0.3, ease: "easeInOut" },
};

export default function ItemRow({ index, register, onDelete }: ItemRowProps) {
	return (
		<motion.div className="overflow-hidden" {...itemAnimationVariants}>
			<div className="flex gap-2">
				<Input
					className="w-9/12"
					placeholder="SKU"
					{...register(`items.${index}.sku`)}
				/>
				<Input
					type="number"
					className="w-2/12"
					placeholder="Quantity"
					{...register(`items.${index}.quantity`)}
				/>
				<Button
					type="button"
					variant="tertiary"
					size="icon"
					onClick={() => onDelete(index)}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</motion.div>
	);
}
