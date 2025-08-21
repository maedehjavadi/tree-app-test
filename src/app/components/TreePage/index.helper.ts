import type { TreeNode } from "@/type/tree";

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
