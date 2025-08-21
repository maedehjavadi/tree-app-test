"use client";

import { Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { ReactFlow, ReactFlowProvider } from "@xyflow/react";
import type React from "react";
import { useEffect, useState } from "react";
import AddNodeDialog from "@/app/components/TreePage/components/AddNodeDialog";
import CustomNode from "@/app/components/TreePage/components/CustomNode";
import {
	addChildToNode,
	deepCloneNode,
	removeNode,
} from "@/app/components/TreePage/index.helper";
import type { TabPanelProps, TreeNode } from "@/type/tree";
import classes from "./index.module.css";

function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}
const initialNodes = [
	{ id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
	{ id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];
export default function TreePage() {
	const theme = useTheme();
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [targetNode, setTargetNode] = useState<TreeNode | null>(null);
	const [treeData, setTreeData] = useState<TreeNode[]>([]);
	const [loading, setLoading] = useState(true);
	const [copiedNode, setCopiedNode] = useState<TreeNode | null>(null);
	const [_cutMode, setCutMode] = useState(false);
	const [value, setValue] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const handleOpenDialog = (n: TreeNode) => {
		setTargetNode(n);
		setAddModalOpen(true);
	};
	const handleCutNode = (node: TreeNode) => {
		setCopiedNode(node);
		setCutMode(true);
		setTreeData((prev) => removeNode(prev, node.id));
	};
	const handleCopyNode = (node: TreeNode) => {
		setCopiedNode(node);
		setCutMode(false);
	};
	const handlePasteNode = (node: TreeNode) => {
		if (copiedNode) {
			const newNode = deepCloneNode(copiedNode);
			setTreeData((prev) => addChildToNode(prev, node.id, newNode));
			setCopiedNode(null);
			setCutMode(false);
		}
	};
	const handleAddNode = (newLabel: string) => {
		if (targetNode && newLabel.trim()) {
			const newNode: TreeNode = {
				id: `node-${Date.now()}`,
				label: newLabel.trim(),
				children: [],
			};
			setTreeData((prev) => addChildToNode(prev, targetNode.id, newNode));
			setAddModalOpen(false);
		}
	};
	const handleDeleteNode = (n: TreeNode) => {
		setTreeData((prev) => removeNode(prev, n.id));
	};
	const handleCloseDialog = () => {
		setAddModalOpen(false);
		setTargetNode(null);
	};

	useEffect(() => {
		fetch("/api/tree") // صدا زدن API
			.then((res) => res.json())
			.then((data) => {
				setTreeData(data);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<Box p={4}>
			<AddNodeDialog
				opened={addModalOpen}
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
					label="Using React Flow Library"
					className={classes.tab}
					{...a11yProps(2)}
				/>
				<Tab
					label="Costumized By Using MUI Components"
					className={classes.tab}
					{...a11yProps(0)}
				/>
			</Tabs>
			<TabPanel value={value} index={1} dir={theme.direction}>
				<ReactFlowProvider>
					<Box className={classes.flow_wrapper}>
						<ReactFlow fitView nodes={initialNodes} edges={initialEdges} />
					</Box>
				</ReactFlowProvider>
			</TabPanel>
			<TabPanel value={value} index={0} dir={theme.direction}>
				<Stack spacing={2} width={"fit-content"}>
					{treeData.map((i) => (
						<CustomNode
							node={i}
							key={i.id}
							defaultExpanded={treeData[0].id === i.id}
							copied={!!copiedNode?.id}
							onDeleteNode={handleDeleteNode}
							onAddNode={handleOpenDialog}
							onCopyNode={handleCopyNode}
							onCutNode={handleCutNode}
							onPasteNode={handlePasteNode}
						/>
					))}
				</Stack>
			</TabPanel>
		</Box>
	);
}
