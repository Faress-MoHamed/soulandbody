import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.ComponentProps<"input"> {
	label: string;
	labelClassName?: string;
	wrapperClassName?: string;
}

export default function CustomInput({
	className,
	type,
	label,
	wrapperClassName,
	labelClassName,
}: CustomInputProps) {
	return (
		<div className={cn("flex flex-col gap-2", wrapperClassName)}>
			<label
				className={cn("text-[16px] text-[#1E1E1E] font-[400]", labelClassName)}
			>
				{label}
			</label>
			<Input
				type={type}
				className={cn(
					"min-w-[240px] bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end",
					className
				)}
			/>
		</div>
	);
}
