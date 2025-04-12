"use client";

import type React from "react";
import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { utils, writeFile } from "xlsx";

interface SelectableComponentProps {
	items: {
		label: string;
		component: React.ReactNode;
		data?: any;
	}[];
	direction?: "horizontal" | "vertical";
	className?: string;
	buttonClassName?: string;
	activeButtonClassName?: string;
	contentClassName?: string;
	withPrinter?: boolean;
	exportToExcel?: any;
}

export default function SelectableComponent({
	items,
	direction = "horizontal",
	className,
	buttonClassName,
	activeButtonClassName,
	contentClassName,
	withPrinter,
}: SelectableComponentProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	// Prevent unnecessary re-renders of the onClick handler
	const handleClick = useCallback((index: number) => {
		setActiveIndex(index);
	}, []);

	// Memoize button list rendering
	const buttons = useMemo(
		() =>
			items.map((item, index) => (
				<button
					key={item.label} // Use label as key for better stability
					onClick={() => handleClick(index)}
					className={cn(
						"px-2 py-1 transition-colors cursor-pointer border-t border-x border-[#D9D9D9] bg-[#fafafa]",
						// "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
						index === activeIndex && (activeButtonClassName || "bg-white"),
						buttonClassName
					)}
					aria-selected={index === activeIndex}
					role="tab"
				>
					{item.label}
				</button>
			)),
		[items, activeIndex, handleClick, buttonClassName, activeButtonClassName]
	);
	const exportToExcel = () => {
		const worksheet = utils.json_to_sheet(items[activeIndex]?.data);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, "table_data.xlsx");
	};
	return (
		<div className={cn("w-full", className)}>
			<div className="flex justify-between w-full">
				<div>
					{
						<Button
							onClick={exportToExcel}
							className="bg-emerald-500 hover:bg-emerald-600 w-[148px] h-[44px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-none rounded-t-[8px]"
						>
							<img src="/print.svg" className="h-6 w-6 mr-2" />
							{"طباعة"}
						</Button>
					}
				</div>{" "}
				{items?.length > 1 && (
					<div
						className={cn(
							"flex justify-end pl-[1px]",
							direction === "horizontal" ? "flex-row" : "flex-col"
						)}
						role="tablist"
					>
						{buttons}
					</div>
				)}
			</div>
			<div className={cn("border-t", contentClassName)} role="tabpanel">
				{items[activeIndex]?.component}
			</div>
		</div>
	);
}
