import { Inter } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../components/post-hog-provider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Pallet Labels",
	description: "Easily create and print pallet labels",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<PostHogProvider>{children}</PostHogProvider>
			</body>
		</html>
	);
}
