import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { startTransition, useEffect, useState } from "react";

export type Props = {
	opened: boolean;
	onClose: VoidFunction;
	onAddNode: (nodeLabel: string) => void;
};
export default function AddNodeDialog(props: Props) {
	const [label, setLabel] = useState<string>("");
	useEffect(() => {
		return () => setLabel("");
	}, []);
	return (
		<Dialog open={props.opened} onClose={props.onClose}>
			<DialogTitle>Add New Node</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Node Label"
					fullWidth
					value={label}
					onChange={(e) => startTransition(() => setLabel(e.target.value))}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button onClick={() => props.onAddNode(label)} variant="contained">
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}
