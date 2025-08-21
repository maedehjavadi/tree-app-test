import type { ReactNode } from "react";

export type TreeNode = {
	id: string;
	label: string;
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
	onClick: VoidFunction;
	icon: ReactNode;
	disabled?: boolean;
};
