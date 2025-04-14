import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.ComponentProps<"input"> {
	label?: string;
	labelClassName?: string;
	wrapperClassName?: string;
	error?: string;
}

export default function CustomInput({
	className,
	type,
	label,
	wrapperClassName,
	labelClassName,
	error,
	...props
}: CustomInputProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-2 md:w-[302px] w-full",
				wrapperClassName
			)}
		>
			{label && (
				<label
					className={cn(
						"text-[16px] text-[#1E1E1E] font-[400] text-start",
						labelClassName
					)}
				>
					{label}
				</label>
			)}
			<Input
				type={type}
				className={cn(
					"min-w-[240px] bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end h-[48px]",
					className
				)}
				{...props}
			/>
			{error && <p>{error}</p>}
		</div>
	);
}
