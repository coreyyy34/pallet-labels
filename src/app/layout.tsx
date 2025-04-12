import { Inter } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../components/post-hog-provider";

const inter = Inter({ subsets: ["latin"] });

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
