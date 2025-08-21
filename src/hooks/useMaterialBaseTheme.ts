"use client";

import { createTheme } from "@mui/material";
import { palette } from "@/constants/colors";

export default function useMaterialBaseTheme() {
	const theme = createTheme({
		palette: {
			primary: {
				50: palette.blue[0],
				100: palette.blue[1],
				200: palette.blue[2],
				300: palette.blue[3],
				400: palette.blue[4],
				500: palette.blue[5],
				600: palette.blue[6],
				700: palette.blue[7],
				800: palette.blue[8],
				900: palette.blue[9],
				main: palette.blue[5],
			},
			secondary: {
				50: palette.gray[0],
				100: palette.gray[1],
				200: palette.gray[2],
				300: palette.gray[3],
				400: palette.gray[4],
				500: palette.gray[5],
				600: palette.gray[6],
				700: palette.gray[7],
				800: palette.gray[8],
				900: palette.gray[9],
				main: palette.gray[5],
			},
		},
	});
	return { theme };
}
