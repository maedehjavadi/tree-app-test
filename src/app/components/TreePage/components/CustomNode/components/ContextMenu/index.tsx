import {
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	type PopoverOrigin,
	Typography,
} from "@mui/material";
import type { ActionButton, TreeNode } from "@/type/tree";

type Props = {
	node: TreeNode;
	opened: boolean;
	onClose: VoidFunction;
	anchorEl?: HTMLElement | null;
	menuActions: ActionButton[];
	menuPosition?: PopoverOrigin;
};
export default function ContextMenu(props: Props) {
	return (
		<Menu
			id={`context-menu ${props.node.id}`}
			anchorEl={props.anchorEl}
			open={props.opened}
			onClose={props.onClose}
			anchorOrigin={
				props.menuPosition ?? {
					vertical: "top",
					horizontal: "left",
				}
			}
		>
			<MenuList sx={{ padding: 0 }}>
				{props.menuActions.map((item) => (
					<MenuItem
						key={item.label}
						disabled={item.disabled}
						onClick={() => item.onClick(props.node)}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText>
							<Typography fontSize={14}>{item.label}</Typography>
						</ListItemText>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}
