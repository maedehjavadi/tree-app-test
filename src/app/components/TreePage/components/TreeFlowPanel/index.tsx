"use client";

import { Box } from "@mui/material";
import {
	Background,
	BackgroundVariant,
	BaseEdge,
	Controls,
	type EdgeTypes,
	type NodeTypes,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import { useEffect } from "react";
import DefaultNode from "@/app/components/TreePage/components/TreeFlowPanel/components/DefaultNode";
import { flattenTree } from "@/app/components/TreePage/index.helper";
import classes from "@/app/components/TreePage/index.module.css";
import type { ActionButton, TreeNode } from "@/type/tree";

const nodeTypes: NodeTypes = {
	// @ts-expect-error
	custom: DefaultNode,
};
const edgeTypes: EdgeTypes = {
	// @ts-expect-error
	custom: BaseEdge,
};
type Props = {
	data: TreeNode[];
	menu: ActionButton[];
};
export default function TreeFlowPanel(props: Props) {
	const convertedTree = flattenTree(props.data, props.menu);
	const [nodes, setNodes, onNodesChange] = useNodesState(convertedTree.nodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(convertedTree.edges);

	useEffect(() => {
		const updated = flattenTree(props.data, props.menu);
		setNodes(updated.nodes);
		setEdges(updated.edges);
	}, [props.data, props.menu, setNodes, setEdges]);

	return (
		<Box className={classes.flow_wrapper}>
			<ReactFlow
				fitView
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
			>
				<Background variant={BackgroundVariant.Lines} />
				<Controls />
			</ReactFlow>
		</Box>
	);
}
