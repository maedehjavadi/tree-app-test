"use client";

import {Box} from "@mui/material";
import {Handle, type NodeProps, Position, useReactFlow} from "@xyflow/react";
import type React from "react";
import {useState} from "react";
import ContextMenu from "@/app/components/TreePage/components/CustomNode/components/ContextMenu";
import type {DefaultNodeData} from "@/type/tree";
import classes from "../../../../index.module.css";

// @ts-ignore
export default function DefaultNode(props: NodeProps<DefaultNodeData>) {
	const { data, positionAbsoluteX, positionAbsoluteY, id } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

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
	// @ts-ignore
				className={data?.node.expanded ? classes.expanded_node : classes.node}
			>
	{/*// @ts-ignore*/}
				{data?.label}
			</Box>

			<ContextMenu
	// @ts-ignore
				node={data?.node}
	// @ts-ignore
				menuActions={data?.menu}
				opened={open}
				onClose={handleClose}
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
