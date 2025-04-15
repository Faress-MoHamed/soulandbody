import React from "react";
import { Select, SelectContent, SelectItem } from "../ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import LoadingIndicator from "../loadingIndicator";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

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
	error?: string;
	loading?: boolean;
}

export default function CustomSelect({
	label,
	placeholder,
	options = ["أحمد محمود", "محمد علي", "خالد حسن", "ياسر عبد الله", "سعيد عمر"],
	size = "default",
	dir = "rtl",
	className,
	triggerClassName,
	loading,
	error,
	...props
}: CustomSelectProps) {
	const { t } = useTypedTranslation();
	console.log(label)
	return (
		<div className={cn("flex flex-col gap-2 lg:w-[302px] w-full", className)}>
			{label && (
				<label className="text-[16px] text-[#1E1E1E] font-[400] text-start">
					{label}
				</label>
			)}
			<Select dir={t("dir") as "rtl" | "ltr"} {...props}>
				<SelectTrigger
					size={size}
					className={cn(
						"!h-[48px] lg:w-[302px] w-full bg-white",
						triggerClassName
					)}
				>
					<SelectValue
						placeholder={placeholder ? placeholder : t("filter.placeholder")}
					/>
				</SelectTrigger>
				<SelectContent className="z-[+99999]">
					{options?.map((option) => {
						const value = typeof option === "string" ? option : option.value;
						const label = typeof option === "string" ? option : option.label;
						return loading ? (
							<LoadingIndicator />
						) : (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			{error && <p>{error}</p>}
		</div>
	);
}
