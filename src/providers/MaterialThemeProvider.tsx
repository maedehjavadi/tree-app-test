"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import type { PropsWithChildren } from "react";
import useMaterialBaseTheme from "@/hooks/useMaterialBaseTheme";

export default function MaterialThemeProvider(props: PropsWithChildren) {
	const { theme } = useMaterialBaseTheme();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	);
}
