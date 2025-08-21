import {
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	Typography,
} from "@mui/material";
import type { ActionButton } from "@/type/tree";

type Props = {
	id: string;
	opened: boolean;
	onClose: VoidFunction;
	anchorEl?: HTMLElement | null;
	menuActions: ActionButton[];
};
export default function ContextMenu(props: Props) {
	return (
		<Menu
			id={`context-menu ${props.id}`}
			anchorEl={props.anchorEl}
			open={props.opened}
			onClose={props.onClose}
			anchorOrigin={{
				vertical: "top",
				horizontal: "left",
			}}
		>
			<MenuList sx={{ padding: 0 }}>
				{props.menuActions.map((item) => (
					<MenuItem
						key={item.label}
						disabled={item.disabled}
						onClick={item.onClick}
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
