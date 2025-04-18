import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

interface CustomInputProps extends React.ComponentProps<"input"> {
	label?: string;
	labelClassName?: string;
	wrapperClassName?: string;
	error?: any;
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
		const { t } = useTypedTranslation();
	
	return (
		<div
			className={cn(
				"flex flex-col gap-2 lg:w-[302px] w-full",
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
				dir={t("dir") as "rtl" | "ltr"}
				type={type}
				className={cn(
					"min-w-[240px] bg-white border-[#D9D9D9] placeholder:text-black text-start flex justify-end h-[48px]",
					className
				)}
				{...props}
			/>
			{error && <p className="text-[12px] text-red-500 text-start">{error}</p>}
		</div>
	);
}
