"use client";

import Input from "@/components/input";
import ItemsSection from "@/components/items-section";
import Button from "@/components/button";
import usePalletForm from "@/hooks/use-pallet-form";

export default function Home() {
	const {
		showNoItemsError,
		register,
		handleSubmit,
		fields,
		onReset,
		onSubmit,
		onDeleteItem,
		onAddItem,
	} = usePalletForm();

	return (
		<form className="space-y-4 p-6" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Pallet Title
				</label>
				<Input
					placeholder="e.g. Fans, Pools"
					className="w-full"
					{...register("title")}
				/>
			</div>
			<div>
				<label className="block text-gray-700 font-semibold mb-2">
					Items
				</label>
				<ItemsSection
					showNoItemsError={showNoItemsError}
					register={register}
					fields={fields}
					onDeleteItem={onDeleteItem}
					onAddItem={onAddItem}
				/>
			</div>
			<div className="flex gap-2">
				<Button
					type="button"
					className="w-full to-indigo-600 hover:to-indigo-700"
					onClick={onReset}
				>
					Reset
				</Button>
				<Button className="w-full from-indigo-600 hover:from-indigo-700">
					Print
				</Button>
			</div>
		</form>
	);
}
