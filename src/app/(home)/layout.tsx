import Logo from "@/components/logo";
import type { ReactNode } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center py-8 px-4">
			<div className="max-w-screen-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-container">
				<div className="flex justify-center items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 p-6">
					<Logo />
					<h1 className="font-bold text-3xl md:text-4xl text-center text-white">
						Pallet Labels
					</h1>
				</div>
				{children}
			</div>
		</main>
	);
}
