import type { Edge, Node } from "@xyflow/react";
import type { ActionButton, TreeNode } from "@/type/tree";

export function addChildToNode(
	nodes: TreeNode[],
	targetId: string,
	newChild: TreeNode,
): TreeNode[] {
	return nodes.map((node) => {
		if (node.id === targetId) {
			return {
				...node,
				children: [...(node.children ?? []), newChild], // اضافه کردن کپی نود
			};
		}

		if (node.children) {
			return {
				...node,
				children: addChildToNode(node.children, targetId, newChild),
			};
		}

		return node;
	});
}

export function removeNode(nodes: TreeNode[], targetId: string): TreeNode[] {
	return nodes
		.map((node) => {
			if (node.children) {
				return {
					...node,
					children: removeNode(node.children, targetId),
				};
			}
			return node;
		})
		.filter((node) => node.id !== targetId);
}
export function deepCloneNode(node: TreeNode): TreeNode {
	return {
		...node,
		id: `${node.id}-${Date.now()}`,
		children: node.children
			? node.children.map((child) => deepCloneNode(child))
			: [],
	};
}

export function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

export function flattenTree(
	tree: TreeNode[],
	menu: ActionButton[],
): {
	nodes: Node[];
	edges: Edge[];
} {
	const nodes: Node[] = [];
	const edges: Edge[] = [];

	function traverse(
		node: TreeNode,
		parentId: string | null,
		depth: number,
		index: number,
	): void {
		nodes.push({
			id: node.id,
			type: "custom",
			data: {
				label: `${node.label} ${index + 1}`,
				node,
				menu,
				root: index === 0,
			},
			position: { x: depth * 220, y: index * 100 },
		});

		if (parentId) {
			edges.push({
				id: `${parentId}-${node.id}`,
				source: parentId,
				target: node.id,
				// type: "custom",
			});
		}

		if (node.children && node.children.length > 0) {
			node.children.forEach((child, i) => {
				traverse(child, node.id, depth + 1, i);
			});
		}
	}

	tree.forEach((root, i) => {
		traverse(root, null, 0, i);
	});

	return { nodes, edges };
}
