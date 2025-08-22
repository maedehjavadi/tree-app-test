import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Delete from "@mui/icons-material/Delete";
import PlusOne from "@mui/icons-material/PlusOne";
import { useEffect, useState } from "react";
import {
	addChildToNode,
	deepCloneNode,
	removeNode,
} from "@/app/components/TreePage/index.helper";
import type { ActionButton, TreeNode } from "@/type/tree";

export function useNodeContextMenu() {
	const [addModalOpened, setAddModalOpen] = useState(false);
	const [targetNode, setTargetNode] = useState<TreeNode | null>(null);
	const [treeData, setTreeData] = useState<TreeNode[]>([]);
	const [loading, setLoading] = useState(true);
	const [copiedNode, setCopiedNode] = useState<TreeNode | null>(null);
	// const [_cutMode, setCutMode] = useState(false);
	const handleOpenDialog = (n: TreeNode) => {
		setTargetNode(n);
		setAddModalOpen(true);
	};
	const handleCutNode = (node: TreeNode) => {
		setCopiedNode(node);
		// setCutMode(true);
		setTreeData((prev) => removeNode(prev, node.id));
	};
	const handleCopyNode = (node: TreeNode) => {
		setCopiedNode(node);
		// setCutMode(false);
	};
	const handlePasteNode = (node: TreeNode) => {
		if (copiedNode) {
			const newNode = deepCloneNode(copiedNode);
			setTreeData((prev) => addChildToNode(prev, node.id, newNode));
			setCopiedNode(null);
			// setCutMode(false);
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
		setTargetNode(n);
		setTreeData((prev) => removeNode(prev, n.id));
	};
	const handleCloseDialog = () => {
		setAddModalOpen(false);
		setTargetNode(null);
	};
	useEffect(() => {
		fetch("/api/tree")
			.then((res) => res.json())
			.then((data) => {
				setTreeData(data);
				setLoading(false);
			});
	}, []);
	const menuItems: ActionButton[] = [
		{
			label: "Cut",
			onClick: handleCutNode,
			icon: <ContentCut fontSize="small" />,
		},
		{
			label: "Copy",
			onClick: handleCopyNode,
			icon: <ContentCopy fontSize="small" />,
		},
		{
			label: "Paste",
			onClick: handlePasteNode,
			icon: <ContentPaste fontSize="small" />,
			disabled: !copiedNode,
		},
		{
			label: "Delete",
			onClick: handleDeleteNode,
			icon: <Delete fontSize="small" />,
			disabled: !!targetNode?.children?.length,
		},
		{
			label: "Add Node",
			onClick: handleOpenDialog,
			icon: <PlusOne fontSize="small" />,
		},
	];
	return {
		menuItems,
		addModalOpened,
		handleCloseDialog,
		handleAddNode,
		treeData,
		setTreeData,
		loading,
	};
}
