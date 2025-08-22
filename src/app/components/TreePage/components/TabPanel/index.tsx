import { Box, Typography } from "@mui/material";
import type { TabPanelProps } from "@/type/tree";

export default function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }} height={"100vh"}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
