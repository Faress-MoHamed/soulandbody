"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useSidebar } from "@/components/ui/sidebar";

interface CustomPasswordInputProps extends React.ComponentProps<"input"> {
	label?: string;
	labelClassName?: string;
	wrapperClassName?: string;
	error?: any;
}

export default function CustomPasswordInput({
	className,
	label,
	wrapperClassName,
	labelClassName,
	error,
	...props
}: CustomPasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const { t } = useTypedTranslation();
	const { open } = useSidebar();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div
			className={cn(
				"flex flex-col gap-2 lg:w-[302px] w-full",
				`${open && "lg:w-auto"}`,
				wrapperClassName
			)}
		>
			{label && (
				<label
					htmlFor={props.id}
					className={cn(
						"text-[16px] text-[#1E1E1E] font-[400] text-start",
						labelClassName
					)}
				>
					{label}
				</label>
			)}
			<div className="relative">
				<Input
					dir={t("dir") as "rtl" | "ltr"}
					type={showPassword ? "text" : "password"}
					className={cn(
						"min-w-[240px] bg-white border-[#D9D9D9] placeholder:text-black text-start flex justify-end h-[48px] pr-10",
						className
					)}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute end-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-transparent"
					onClick={togglePasswordVisibility}
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{!showPassword ? (
						<EyeOff className="h-5 w-5" />
					) : (
						<Eye className="h-5 w-5" />
					)}
				</Button>
			</div>
			{error && <p className="text-[12px] text-red-500 text-start">{error}</p>}
		</div>
	);
}
