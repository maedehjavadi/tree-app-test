import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import MaterialThemeProvider from "@/providers/MaterialThemeProvider";

export const metadata: Metadata = {
	title: "TreePage App Test",
	description: "TreePage app with context menu using Next.js + MUI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<MaterialThemeProvider>{children}</MaterialThemeProvider>
			</body>
		</html>
	);
}
