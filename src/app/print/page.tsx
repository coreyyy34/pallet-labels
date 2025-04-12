import OpenPrintDialog from "@/components/open-print-dialog";
import { deserialisePalletLabel } from "@/utils/serialiser";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Print Pallet Label",
	description: "Easily create and print pallet labels",
};

export default async function PrintPage({
	searchParams,
}: {
	searchParams: Promise<{
		[key: string]: string;
	}>;
}) {
	const params = await searchParams;
	const palletLabel = deserialisePalletLabel(new URLSearchParams(params));

	// Don't generate a pallet label if there aren't any items on it
	if (palletLabel.items.length == 0) {
		return redirect("/");
	}

	return (
		<>
			{/* Regular screen view */}
			<div className="min-h-screen bg-neutral-100 p-8">
				<div
					id="page"
					className="bg-white shadow-sm mx-auto w-[210mm] min-h-[297mm]"
				>
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
										(sum, item) =>
											sum + Number(item.quantity), // should always be a number
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
				</div>
			</div>

			<OpenPrintDialog />

			{/* Print styles */}
			<style>
				{`
                @media print {
                    @page {
                        margin: 0;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                    }

                    .min-h-screen {
                        min-height: 0;
                    }

                    .bg-neutral-100 {
                        background: none;
                    }

                    .shadow-sm {
                        box-shadow: none;
                    }

                    #page {
                        min-height: 0;
                        width: auto;
                    }
                }
            `}
			</style>
		</>
	);
}
