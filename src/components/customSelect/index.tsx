"use client";

import React, { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem } from "../ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import LoadingIndicator from "../loadingIndicator";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useSidebar } from "../ui/sidebar";

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: "sm" | "default";
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				"min-w-[240px]",
				className
			)}
			{...props}
		>
			{children}

			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-4 opacity-50" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

interface CustomSelectProps
	extends React.ComponentProps<typeof SelectPrimitive.Root> {
	label?: any;
	size?: "sm" | "default";
	dir?: "rtl" | "ltr";
	className?: string;
	placeholder?: string;
	options?: { value: string; label: string }[] | string[];
	triggerClassName?: string;
	error?: any;
	loading?: boolean;
	value?: any;
	triggerStyle?: React.CSSProperties | undefined;
	addNew?: boolean;
	onAddNew?: (value: string) => void;
}

export default function CustomSelect({
	label,
	placeholder,
	options = [],
	size = "default",
	dir = "rtl",
	className,
	triggerClassName,
	loading,
	error,
	value,
	triggerStyle,
	addNew = false,
	onAddNew,
	...props
}: CustomSelectProps) {
	const { t } = useTypedTranslation();
	const { open } = useSidebar();
	const [search, setSearch] = useState("");

	const filteredOptions = useMemo(() => {
		return (
			options?.filter((option) => {
				const label = typeof option === "string" ? option : option.label;
				return label.toLowerCase().includes(search.toLowerCase());
			}) || []
		);
	}, [options, search]);

	let selectedValue: string | { value: string; label: string } | undefined;
	if (typeof value === "string" || typeof value === "number") {
		console.log(value);
		selectedValue = options.find((el) => {
			if (typeof el === "string" || typeof el === "number") {
				return el.toString() === value;
			}
			console.log(el, value);
			return el?.value.toString() === value.toString();
		});
		console.log(selectedValue);
	}

	return (
		<div
			className={cn(
				"flex flex-col gap-2 lg:w-[302px] w-full",
				`${open && "lg:w-auto"}`,
				className
			)}
		>
			{label && (
				<label className="text-[16px] text-[#1E1E1E] font-[400] text-start">
					{label}
				</label>
			)}
			<Select
				value={
					typeof selectedValue === "string"
						? selectedValue
						: selectedValue?.value
				}
				dir={t("dir") as "rtl" | "ltr"}
				{...props}
			>
				<SelectTrigger
					value={
						typeof selectedValue === "string"
							? selectedValue
							: selectedValue?.value
					}
					size={size}
					className={cn(
						"!h-[48px] lg:w-[302px] w-full bg-white",
						`${open && "lg:w-auto"}`,
						triggerClassName
					)}
					style={triggerStyle}
				>
					<SelectValue placeholder={placeholder || t("filter.placeholder")} />
				</SelectTrigger>
				<SelectContent className="z-[+99999]">
					<div className="px-2 py-1">
						<input
							type="text"
							placeholder={"ابحث..."}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						/>
					</div>
					<div className="max-h-60 overflow-y-auto">
						{filteredOptions.length === 0 && (
							<p className="px-3 py-2 text-sm text-muted-foreground">
								{"لا توجد نتائج"}
							</p>
						)}
						{filteredOptions.map((option) => {
							const value = typeof option === "string" ? option : option.value;
							const label = typeof option === "string" ? option : option.label;
							const key = `${value}`; // Ensure unique key by using value directly

							return loading ? (
								<LoadingIndicator key={key} />
							) : (
								<SelectItem key={key} value={value}>
									{label}
								</SelectItem>
							);
						})}
						{addNew && (
							<div className="px-2 py-1">
								<input
									type="text"
									placeholder={"أضف جديد..."}
									className="w-full rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
									onKeyDown={(e) => {
										if (e.key === "Enter" && onAddNew) {
											onAddNew(e.currentTarget.value);
											e.currentTarget.value = "";
										}
									}}
								/>
							</div>
						)}
					</div>
				</SelectContent>
			</Select>
			{error && <p className="text-start text-destructive">{error}</p>}
		</div>
	);
}
