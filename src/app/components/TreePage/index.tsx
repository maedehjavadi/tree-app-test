"use client";

import { Box, Stack, Tab, Tabs, useTheme } from "@mui/material";
import type React from "react";
import { useState } from "react";
import AddNodeDialog from "@/app/components/TreePage/components/AddNodeDialog";
import CustomNode from "@/app/components/TreePage/components/CustomNode";
import TabPanel from "@/app/components/TreePage/components/TabPanel";
import TreeFlowPanel from "@/app/components/TreePage/components/TreeFlowPanel";
import { a11yProps } from "@/app/components/TreePage/index.helper";
import { useNodeContextMenu } from "@/app/components/TreePage/index.hooks";
import classes from "./index.module.css";

export default function TreePage() {
	const theme = useTheme();
	const [value, setValue] = useState(0);
	const {
		treeData,
		loading,
		addModalOpened,
		handleAddNode,
		handleCloseDialog,
		menuItems,
	} = useNodeContextMenu();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<Box p={4}>
			<AddNodeDialog
				opened={addModalOpened}
				onClose={handleCloseDialog}
				onAddNode={handleAddNode}
			/>
			<Tabs
				centered
				value={value}
				onChange={handleChange}
				sx={{ borderBottom: 1, borderBottomColor: "lightgrey" }}
			>
				<Tab
					label="Costumized By Using MUI Components"
					className={classes.tab}
					{...a11yProps(0)}
				/>
				<Tab
					label="Using React Flow Library"
					className={classes.tab}
					{...a11yProps(1)}
				/>
			</Tabs>
			<TabPanel value={value} index={0} dir={theme.direction}>
				<Stack spacing={2} width={"fit-content"}>
					{treeData.map((i) => (
						<CustomNode
							node={i}
							key={i.id}
							defaultExpanded={treeData[0].id === i.id}
							menuItems={menuItems}
						/>
					))}
				</Stack>
			</TabPanel>
			<TabPanel value={value} index={1} dir={theme.direction}>
				<TreeFlowPanel data={treeData} menu={menuItems} />
			</TabPanel>
		</Box>
	);
}
