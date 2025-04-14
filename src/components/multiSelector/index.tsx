"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CustomSelect from "../customSelect";

interface Option {
	value: string;
	label: string;
}

interface MultiSelectProps {
	placeholder?: string;
	options: Option[];
	onChange?: (selectedValues: string[]) => void;
	direction?: "ltr" | "rtl";
}

export function MultiSelect({
	placeholder = "Select options",
	options,
	onChange,
	direction = "rtl",
}: MultiSelectProps) {
	const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

	const handleSelect = (value: string) => {
		// Only add if not already selected
		if (!selectedValues.includes(value)) {
			const newValues = [...selectedValues, value];
			setSelectedValues(newValues);
			onChange?.(newValues);
		}
	};

	const handleRemove = (valueToRemove: string) => {
		const newValues = selectedValues.filter((value) => value !== valueToRemove);
		setSelectedValues(newValues);
		onChange?.(newValues);
	};

	const getLabel = (value: string) => {
		return options.find((option) => option.value === value)?.label || value;
	};

	return (
		<div
			className={`space-y-4  md:max-w-fit  md:w-[302px] max-h-fit w-full  min-w-auto ${
				direction === "rtl" ? "text-right" : "text-left"
			}`}
			dir={direction}
		>
			<CustomSelect
				dir="rtl"
				triggerClassName="!h-[48px] md:w-[302px] w-full  min-w-auto bg-white"
				options={options}
				onValueChange={handleSelect}
			/>
			{/* <Select onValueChange={handleSelect}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select> */}

			{selectedValues.length > 0 && (
				<div className="flex flex-wrap gap-2 justify-start ">
					{selectedValues.map((value) => (
						<Badge
							key={value}
							variant="secondary"
							className="bg-green-100 text-green-800 hover:bg-green-200"
						>
							{getLabel(value)}
							<button
								onClick={() => handleRemove(value)}
								className="ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					))}
				</div>
			)}
		</div>
	);
}
