"use client";
import React from "react";
import { DatePicker } from "@heroui/react";
import {
	DateValue,
	parseDate,
	getLocalTimeZone,
	type CalendarDate,
	type CalendarDateTime,
	type ZonedDateTime,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDatePickerProps {
	label?: string;
	placeholder?: string;
	wrapperClassName?: string;
	defaultValue?: string | DateValue; // Allow both string and DateValue
	value?: DateValue; // Controlled component support
	onChange?: (
		date: CalendarDate | CalendarDateTime | ZonedDateTime | null
	) => void;
	isRequired?: boolean;
	isDisabled?: boolean;
}

export const CustomDatePicker = ({
	label = "Select Date",
	placeholder = "MM/DD/YYYY",
	defaultValue,
	value: propValue, // Controlled value
	onChange,
	wrapperClassName,
	isRequired = false,
	isDisabled = false,
}: CustomDatePickerProps) => {
	const [internalValue, setInternalValue] = React.useState<DateValue | null>(
		() => {
			if (propValue !== undefined) return propValue;
			if (defaultValue) {
				return typeof defaultValue === "string"
					? parseDate(defaultValue)
					: defaultValue;
			}
			return null;
		}
	);

	// Sync with controlled value
	React.useEffect(() => {
		if (propValue !== undefined) {
			setInternalValue(propValue);
		}
	}, [propValue]);

	const handleChange = (
		date: CalendarDate | CalendarDateTime | ZonedDateTime | null
	) => {
		if (propValue === undefined) {
			// Only update internal state if uncontrolled
			setInternalValue(date);
		}
		onChange?.(date);
	};

	return (
		<div className="flex flex-col gap-2">
			{label && <label>{label}</label>}
			<DatePicker
				value={propValue ?? internalValue}
				onChange={handleChange}
				isRequired={isRequired}
				isDisabled={isDisabled}
				className={cn(
					"border border-[oklch(.92 .004 286.32)] rounded-md shadow-none",
					wrapperClassName
				)}
				lang="ar"
				variant="bordered"
				classNames={{
					base: "w-full justify-center",
					label: "text-sm font-medium text-default-700",
					calendar: "shadow-xl rounded-md border-1 border-default-200",
					popoverContent: "bg-white shadow-xl border-0.5 rounded-md p-1",
					inputWrapper: "!shadow-none h-[48px] justify-center border-none",
				}}
				popoverProps={{
					classNames: {
						content: "p-1 border",
					},
				}}
				calendarProps={{
					classNames: {
						headerWrapper: "flex-row-reverse",
						gridHeaderCell: "",
						cell: "hover:bg-gray-100 rounded-full duration-300 cursor-pointer",
					},
				}}
				// showMonthAndYearPickers
			/>
		</div>
	);
};
