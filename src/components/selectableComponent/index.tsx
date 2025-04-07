"use client";

import type React from "react";
import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SelectableComponentProps {
	items: {
		label: string;
		component: React.ReactNode;
	}[];
	direction?: "horizontal" | "vertical";
	className?: string;
	buttonClassName?: string;
	activeButtonClassName?: string;
	contentClassName?: string;
}

export default function SelectableComponent({
	items,
	direction = "horizontal",
	className,
	buttonClassName,
	activeButtonClassName,
	contentClassName,
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

	return (
		<div className={cn("w-full", className)}>
			{items?.length > 1 && (
				<div
					className={cn(
						"flex gap-2  w-full justify-end pl-[1px]",
						direction === "horizontal" ? "flex-row" : "flex-col"
					)}
					role="tablist"
				>
					{buttons}
				</div>
			)}
			<div className={cn("mt-2", contentClassName)} role="tabpanel">
				{items[activeIndex]?.component}
			</div>
		</div>
	);
}
