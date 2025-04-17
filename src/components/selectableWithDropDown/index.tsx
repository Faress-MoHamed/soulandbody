"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { utils, writeFile } from "xlsx";

interface SelectableOption {
	label: string;
	component: React.ReactNode;
	data?: any;
}

interface SelectableItemProps {
	label: string;
	component?: React.ReactNode;
	options?: SelectableOption[];
	data?: any;
}

interface SelectableWithDropDownProps {
	items: SelectableItemProps[];
	direction?: "horizontal" | "vertical";
	className?: string;
	buttonClassName?: string;
	activeButtonClassName?: string;
	contentClassName?: string;
	withTopPrinter?: boolean;
}

export default function SelectableWithDropDown({
	items,
	direction = "horizontal",
	className,
	buttonClassName,
	activeButtonClassName,
	contentClassName,
	withTopPrinter = true,
}: SelectableWithDropDownProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
		null
	);

	const handleClick = useCallback((index: number) => {
		setActiveIndex(index);
		setActiveOptionIndex(null);
	}, []);

	const handleOptionClick = useCallback((index: number) => {
		setActiveOptionIndex(index);
	}, []);

	const exportToExcel = () => {
		const activeItem = items[activeIndex];
		const dataToExport =
			activeOptionIndex !== null
				? activeItem.options?.[activeOptionIndex]?.data
				: activeItem.data;

		if (dataToExport) {
			const worksheet = utils.json_to_sheet(dataToExport);
			const workbook = utils.book_new();
			utils.book_append_sheet(workbook, worksheet, "Sheet1");
			writeFile(workbook, "exported_data.xlsx");
		}
	};

	const buttons = useMemo(
		() =>
			items.map((item, index) => {
				if (item.options && item.options.length > 0) {
					return (
						<DropdownMenu key={index}>
							<DropdownMenuTrigger asChild>
								<button
									className={cn(
										"flex items-center gap-1 px-4 py-[10px] transition-colors text-nowrap cursor-pointer border-t border-x border-[#D9D9D9] bg-[#fafafa]",
										index === activeIndex &&
											(activeButtonClassName || "bg-white"),
										buttonClassName
									)}
									aria-selected={index === activeIndex}
									role="tab"
								>
									{item.label}
									<ChevronDown className="h-4 w-4" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48">
								{item.options.map((option, optionIndex) => (
									<DropdownMenuItem
										key={optionIndex}
										onClick={() => {
											handleClick(index);
											handleOptionClick(optionIndex);
										}}
									>
										{option.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					);
				}

				return (
					<button
						key={item.label}
						onClick={() => handleClick(index)}
						className={cn(
							"px-4 py-[10px] transition-colors text-nowrap cursor-pointer border-t border-x border-[#D9D9D9] bg-[#fafafa]",
							index === activeIndex && (activeButtonClassName || "bg-white"),
							buttonClassName
						)}
						aria-selected={index === activeIndex}
						role="tab"
					>
						{item.label}
					</button>
				);
			}),
		[items, activeIndex, handleClick, buttonClassName, activeButtonClassName]
	);

	return (
		<div className={cn("w-full", className)}>
			<div className="flex justify-between w-full">
				<div>
					{withTopPrinter &&
						activeOptionIndex !== null &&
						(items[activeIndex].options?.[activeOptionIndex]?.data ||
							items[activeIndex].data) && (
							<Button
								onClick={exportToExcel}
								className="bg-emerald-500 hover:bg-emerald-600 md:w-36 h-11 text-base flex items-center gap-2 cursor-pointer rounded-none rounded-t-lg"
							>
								<img src="/print.svg" className="h-6 w-6 mr-2" alt="Print" />
								Print
							</Button>
						)}
				</div>
				{items?.length > 1 && (
					<div
						className={cn(
							"flex md:justify-end pl-[1px] overflow-x-auto max-w-full",
							direction === "horizontal" ? "flex-row" : "flex-col"
						)}
						role="tablist"
					>
						{buttons}
					</div>
				)}
			</div>
			<div
				className={cn(" max-w-full border", contentClassName)}
				role="tabpanel"
			>
				{activeOptionIndex !== null
					? items[activeIndex].options?.[activeOptionIndex]?.component
					: items[activeIndex]?.component}
			</div>
		</div>
	);
}
