import type { ReactNode } from "react";

export type TreeNode = {
	id: string;
	label: string;
	expanded?: boolean;
	children?: TreeNode[];
};
export interface TabPanelProps {
	children?: ReactNode;
	dir?: string;
	index: number;
	value: number;
}
export type ActionButton = {
	label: string;
	onClick: (node: TreeNode) => void;
	icon: ReactNode;
	disabled?: boolean;
};

export type DefaultNodeData = {
	node: TreeNode;
	menu: ActionButton[];
	expanded?: boolean;
	label: string;
};
