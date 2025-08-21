import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Delete from "@mui/icons-material/Delete";
import PlusOne from "@mui/icons-material/PlusOne";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Stack,
	Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import ContextMenu from "src/app/components/TreePage/components/CustomNode/components/ContextMenu";
import type { ActionButton, TreeNode } from "@/type/tree";

export default function CustomNode(props: {
	node: TreeNode;
	onCopyNode: (node: TreeNode) => void;
	onCutNode: (node: TreeNode) => void;
	onPasteNode: (node: TreeNode) => void;
	onDeleteNode: (node: TreeNode) => void;
	onAddNode: (node: TreeNode) => void;
	defaultExpanded: boolean;
	copied: boolean;
}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const menuItems: ActionButton[] = [
		{
			label: "Cut",
			onClick: () => props.onCutNode?.(props.node),
			icon: <ContentCut fontSize="small" />,
		},
		{
			label: "Copy",
			onClick: () => props.onCopyNode?.(props.node),
			icon: <ContentCopy fontSize="small" />,
		},
		{
			label: "Paste",
			onClick: () => props.onPasteNode?.(props.node),
			icon: <ContentPaste fontSize="small" />,
			disabled: !props.copied,
		},
		{
			label: "Delete",
			onClick: () => props.onDeleteNode?.(props.node),
			icon: <Delete fontSize="small" />,
			disabled: !!props.node.children?.length,
		},
		{
			label: "Add Node",
			onClick: () => props.onAddNode?.(props.node),
			icon: <PlusOne fontSize="small" />,
		},
	];

	const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Accordion
				sx={{ boxShadow: "unset !important" }}
				defaultExpanded={props.defaultExpanded}
			>
				<AccordionSummary id={props.node.id} aria-controls="panel-content">
					<Stack direction={"row"} alignItems={"center"}>
						{!props.defaultExpanded && (
							<Box sx={{ width: 40, height: 2, backgroundColor: "gray" }} />
						)}
						<Typography
							fontSize={14}
							onContextMenu={handleContextMenu}
							px={3}
							py={1}
							border={1}
							borderRadius={2}
							borderColor={"lightgrey"}
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							{props.node.label}
						</Typography>
					</Stack>
				</AccordionSummary>
				{!!props.node.children?.length && (
					<AccordionDetails>
						<Stack borderLeft={2} borderColor={"gray"}>
							{(props.node.children ?? [])?.map((childNode) => (
								<CustomNode
									key={childNode.id}
									node={childNode}
									defaultExpanded={false}
									onPasteNode={props.onPasteNode}
									onDeleteNode={props.onDeleteNode}
									onAddNode={props.onAddNode}
									onCutNode={props.onCutNode}
									onCopyNode={props.onCopyNode}
									copied={props.copied}
								/>
							))}
						</Stack>
					</AccordionDetails>
				)}
			</Accordion>
			<ContextMenu
				id={props.node.id}
				opened={open}
				onClose={handleClose}
				anchorEl={anchorEl}
				menuActions={menuItems}
			/>
		</Box>
	);
}
