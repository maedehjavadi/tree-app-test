import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Stack,
	Typography,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import ContextMenu from "src/app/components/TreePage/components/CustomNode/components/ContextMenu";
import type { ActionButton, TreeNode } from "@/type/tree";
import classes from "../../index.module.css";

export default function CustomNode(props: {
	node: TreeNode;
	defaultExpanded: boolean;
	menuItems: ActionButton[];
}) {
	const [expanded, setExpanded] = useState<string | false>(false);
	const defaultExpanded = !!expanded || props.defaultExpanded;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleToggleExpand =
		(panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
			if (props.node.children?.length) {
				setExpanded(isExpanded ? panel : false);
			}
		};
	const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <update>
	useEffect(() => {
		if (props.node.expanded) {
			handleToggleExpand(props.node.id);
		}
	}, [props.node.expanded]);

	return (
		<Box>
			<Accordion
				sx={{ boxShadow: "unset !important" }}
				expanded={defaultExpanded}
				onChange={handleToggleExpand(props.node.id)}
			>
				<AccordionSummary id={props.node.id} aria-controls="panel-content">
					<Stack direction={"row"} alignItems={"center"}>
						{!props.defaultExpanded && (
							<Box
								sx={{ width: 40, height: 2, backgroundColor: "lightcoral" }}
							/>
						)}
						<Typography
							fontSize={14}
							onContextMenu={handleContextMenu}
							px={3}
							py={1}
							className={defaultExpanded ? classes.expanded_node : classes.node}
							borderColor={"lightgrey"}
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							{props.node.label} {props.node.id}
						</Typography>
					</Stack>
				</AccordionSummary>
				{!!props.node.children?.length && (
					<AccordionDetails>
						<Stack borderLeft={2} borderColor={"gray"}>
							{(props.node.children ?? [])?.map((childNode) => (
								<CustomNode
									key={childNode.id}
									node={childNode}
									defaultExpanded={false}
									menuItems={props.menuItems}
								/>
							))}
						</Stack>
					</AccordionDetails>
				)}
			</Accordion>
			<ContextMenu
				node={props.node}
				opened={open}
				onClose={handleClose}
				anchorEl={anchorEl}
				menuActions={props.menuItems}
			/>
		</Box>
	);
}
