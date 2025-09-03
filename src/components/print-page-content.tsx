"use client";

import { deserialisePalletLabel } from "@/utils/serialiser";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PrintPageContent = () => {
	const searchParams = useSearchParams();
	const palletLabel = deserialisePalletLabel(
		new URLSearchParams(searchParams.toString())
	);

	useEffect(() => {
		if (palletLabel.items.length === 0) {
			window.location.href = "/";
			return;
		}

		const handle = window.requestAnimationFrame(() => {
			window.print();
		});

		return () => window.cancelAnimationFrame(handle);
	}, [palletLabel]);

	return (
		<div className="p-8">
			{/* Pallet title */}
			{palletLabel.title && (
				<div className="flex items-center justify-center mb-8">
					<h1 className="text-7xl font-bold px-4 text-center text-black break-all uppercase">
						{palletLabel.title}
					</h1>
				</div>
			)}

			{/* Items */}
			<div className="mt-8 border-y-2 border-y-gray-800">
				<div className="flex flex-col">
					{palletLabel.items.map((item, index) => (
						<p
							key={index}
							className="text-center py-3 text-7xl sm:text-8xl text-black font-bold break-all"
						>
							{item.sku}{" "}
							<span className="text-5xl sm:text-6xl lg:text-7xl">
								x{item.quantity}
							</span>
						</p>
					))}
				</div>
			</div>

			{/* Total items count */}
			<div className="mt-8 text-right">
				<p className="text-2xl font-medium text-black">
					Total Items:
					<span className="font-bold ml-2">
						{palletLabel.items.reduce(
							(sum, item) => sum + Number(item.quantity), // should always be a number
							0
						)}
					</span>
				</p>
			</div>

			{/* Footer */}
			<div className="mt-8 text-center text-sm text-gray-500">
				https://pallet-labels.coreyh.nz
			</div>
		</div>
	);
};

export default PrintPageContent;
