"use client";

import {Box} from "@mui/material";
import {Handle, type NodeProps, Position, useReactFlow} from "@xyflow/react";
import type React from "react";
import {useState} from "react";
import ContextMenu from "@/app/components/TreePage/components/CustomNode/components/ContextMenu";
import type {DefaultNodeData} from "@/type/tree";
import classes from "../../../../index.module.css";

export default function DefaultNode(props: NodeProps<DefaultNodeData>) {
	const { data, positionAbsoluteX, positionAbsoluteY, id } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { setNodes } = useReactFlow();

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setAnchorEl(e.currentTarget);
	};
	const handleToggle = () => {
		// setTreeData((prev) =>
		// 	toggleExpand(prev, id as string)
		// );
	};

	return (
		<Box>
			<Box
				onClick={handleToggle}
				onContextMenu={handleContextMenu}
				className={data?.node.expanded ? classes.expanded_node : classes.node}
			>
				{data?.label}
			</Box>

			<ContextMenu
				node={data?.node}
				opened={open}
				onClose={handleClose}
				menuActions={data?.menu}
				menuPosition={{
					vertical: positionAbsoluteY,
					horizontal: positionAbsoluteX,
				}}
			/>
			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</Box>
	);
}
