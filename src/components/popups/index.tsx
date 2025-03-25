"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

export default function CustomPopUp({
	DialogTriggerComponent,
	DialogContentclassName,
	DialogContentComponent,
}: {
	DialogTriggerComponent: () => JSX.Element;
	DialogContentclassName?: string;
	DialogContentComponent: () => JSX.Element;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				onClick={() => {
					setOpen(true);
				}}
				// asChild
			>
				{<DialogTriggerComponent />}
			</DialogTrigger>
			<DialogContent
				className={cn(
					DialogContentclassName
				)}
			>
				{<DialogContentComponent />}
			</DialogContent>
		</Dialog>
	);
}
