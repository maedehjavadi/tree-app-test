import type { Metadata } from "next";
import "./globals.css";
import { ReactFlowProvider } from "@xyflow/react";
import type { ReactNode } from "react";
import MaterialThemeProvider from "@/providers/MaterialThemeProvider";
import "@xyflow/react/dist/style.css";

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
				<MaterialThemeProvider>
					<ReactFlowProvider>{children}</ReactFlowProvider>
				</MaterialThemeProvider>
			</body>
		</html>
	);
}
