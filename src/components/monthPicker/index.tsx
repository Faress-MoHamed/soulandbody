"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format, addYears, subYears } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

interface MonthPickerProps {
	value?: Date;
	onChange?: (date: Date) => void;
	className?: string;
	label?: string;
	wrapperClassName?: string;
}

export function MonthPicker({
	value = new Date(),
	onChange,
	className,
	label,
	wrapperClassName,
}: MonthPickerProps) {
	const [date, setDate] = React.useState(value);
	const [open, setOpen] = React.useState(false);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const handleMonthSelect = (monthIndex: number) => {
		const newDate = new Date(date);
		newDate.setMonth(monthIndex);
		setDate(newDate);
		onChange?.(newDate);
		setOpen(false);
	};

	const handleYearChange = (increment: number) => {
		const newDate = increment > 0 ? addYears(date, 1) : subYears(date, 1);
		setDate(newDate);
	};
	const { t } = useTypedTranslation();
	return (
		<div className={cn("flex flex-col gap-2 w-full", wrapperClassName)}>
			{label && <label className="text-start">{label}</label>}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"	!h-[48px] lg:w-[302px] w-full bg-white justify-start text-left font-normal",
							!date && "text-muted-foreground",
							className
						)}
					>
						<Calendar className="mr-2 h-4 w-4" />
						{format(date, "MMMM yyyy")}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<div className="p-2 space-y-4">
						<div
							className={cn(
								"flex items-center justify-between px-1",
								t("dir") === "rtl" ? "flex-row-reverse " : "flex-row"
							)}
						>
							<Button
								variant="outline"
								size="icon"
								className="h-7 w-7"
								onClick={() => handleYearChange(-1)}
							>
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Previous Year</span>
							</Button>
							<div className="font-medium">{date.getFullYear()}</div>
							<Button
								variant="outline"
								size="icon"
								className="h-7 w-7"
								onClick={() => handleYearChange(1)}
							>
								<ChevronRight className="h-4 w-4" />
								<span className="sr-only">Next Year</span>
							</Button>
						</div>
						<div className="grid grid-cols-3 gap-2">
							{months.map((month, i) => {
								const isCurrentMonth = i === date.getMonth();
								return (
									<Button
										key={month}
										variant={isCurrentMonth ? "default" : "outline"}
										className={cn(
											"h-9",
											isCurrentMonth && "bg-primary text-primary-foreground"
										)}
										onClick={() => handleMonthSelect(i)}
									>
										{month.substring(0, 3)}
									</Button>
								);
							})}
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
