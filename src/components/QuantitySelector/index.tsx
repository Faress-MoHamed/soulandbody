"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useSidebar } from "@/components/ui/sidebar";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
	label?: string;
	labelClassName?: string;
	wrapperClassName?: string;
	defaultValue?: number;
	min?: number;
	max?: number;
	onChange?: (value: number) => void;
}

export default function QuantitySelector({
	label,
	labelClassName,
	wrapperClassName,
	defaultValue = 1,
	min = 0,
	max = 100,
	onChange,
}: QuantitySelectorProps) {
	const { t } = useTypedTranslation();
	const { open } = useSidebar();
	const [quantity, setQuantity] = useState(defaultValue);

	const handleIncrement = () => {
		if (quantity < max) {
			const newValue = quantity + 1;
			setQuantity(newValue);
			onChange?.(newValue);
		}
	};

	const handleDecrement = () => {
		if (quantity > min) {
			const newValue = quantity - 1;
			setQuantity(newValue);
			onChange?.(newValue);
		}
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
					className={cn(
						"text-[16px] text-[#1E1E1E] font-[400] text-start",
						labelClassName
					)}
				>
					{label}
				</label>
			)}
			<div className="flex items-center justify-between border border-[#D9D9D9] rounded-md h-[48px] px-4 bg-white rtl:flex-row-reverse">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={handleDecrement}
					disabled={quantity <= min}
					className="h-8 w-8 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
							stroke="#129D66"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<span className="sr-only">Decrease quantity</span>
				</Button>

				<span className="text-base font-medium">{quantity}</span>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={handleIncrement}
					disabled={quantity >= max}
					className="h-8 w-8 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
							fill="#129D66"
						/>
					</svg>

					<span className="sr-only">Increase quantity</span>
				</Button>
			</div>
		</div>
	);
}
