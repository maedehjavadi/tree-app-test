"use client";

import { Box } from "@mui/material";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import type React from "react";
import { useState } from "react";
import ContextMenu from "@/app/components/TreePage/components/CustomNode/components/ContextMenu";
import type { DefaultNodeData } from "@/type/tree";
import classes from "../../../../index.module.css";

// @ts-expect-error
export default function DefaultNode(props: NodeProps<DefaultNodeData>) {
	const { data, positionAbsoluteX, positionAbsoluteY } = props;
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

	return (
		<Box>
			<Box
				onContextMenu={handleContextMenu}
				// @ts-expect-error
				className={data?.node.expanded ? classes.expanded_node : classes.node}
			>
				{/*// @ts-ignore*/}
				{data?.label}
			</Box>

			<ContextMenu
				// @ts-expect-error
				node={data?.node}
				// @ts-expect-error
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
