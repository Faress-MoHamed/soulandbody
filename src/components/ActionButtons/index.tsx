import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

interface ActionButtonProps {
	type: "button" | "link";
	onClick?: () => void;
	href?: string;
	isLoading?: boolean;
	icon: React.ReactNode;
	text: string;
	className?: string;
	variant?: "destructive" | "success" | "default";
}

const ActionButton: React.FC<ActionButtonProps> = ({
	type,
	onClick,
	href,
	isLoading,
	icon,
	text,
	className = "",
	variant = "default",
}) => {
	const variantClasses = {
		destructive: "text-[#C41619] border-[#C41619] hover:bg-white",
		success: "text-[#16C47F] border-[#16C47F] hover:bg-white",
		default: "",
	};

	const baseClasses =
		"flex items-center gap-2 px-4 py-2 bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border";

	if (type === "link" && href) {
		return (
			<Link
				href={href}
				className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			>
				{icon}
				{text}
			</Link>
		);
	}

	return (
		<Button
			isLoading={isLoading}
			onPress={onClick}
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
		>
			{icon}
			{text}
		</Button>
	);
};

interface ActionButtonsProps {
	deleteAction?: {
		onClick: () => void;
		isLoading: boolean;
	};
	editAction?: {
		href?: string;
		onClick?: () => void;
	};
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
	deleteAction,
	editAction,
}) => {
	const deleteIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-trash-2"
		>
			<path d="M3 6h18" />
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
			<line x1="10" x2="10" y1="11" y2="17" />
			<line x1="14" x2="14" y1="11" y2="17" />
		</svg>
	);

	const editIcon = (
		<svg
			width="15"
			height="14"
			viewBox="0 0 15 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_2272_12726)">
				<path
					d="M6.91797 2.33314H2.83464C2.52522 2.33314 2.22847 2.45606 2.00968 2.67485C1.79089 2.89364 1.66797 3.19039 1.66797 3.49981V11.6665C1.66797 11.9759 1.79089 12.2726 2.00968 12.4914C2.22847 12.7102 2.52522 12.8331 2.83464 12.8331H11.0013C11.3107 12.8331 11.6075 12.7102 11.8263 12.4914C12.0451 12.2726 12.168 11.9759 12.168 11.6665V7.58314M11.293 1.45814C11.525 1.22608 11.8398 1.0957 12.168 1.0957C12.4962 1.0957 12.8109 1.22608 13.043 1.45814C13.275 1.6902 13.4054 2.00495 13.4054 2.33314C13.4054 2.66133 13.275 2.97608 13.043 3.20814L7.5013 8.74981L5.16797 9.33314L5.7513 6.99981L11.293 1.45814Z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2272_12726">
					<rect
						width="14"
						height="14"
						fill="white"
						transform="translate(0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	);

	return (
		<div className="flex justify-center gap-1">
			{deleteAction && (
				<ActionButton
					type="button"
					onClick={deleteAction.onClick}
					isLoading={deleteAction.isLoading}
					icon={deleteIcon}
					text="حذف"
					variant="destructive"
				/>
			)}
			{editAction && (
				<ActionButton
					type={editAction.href ? "link" : "button"}
					href={editAction.href}
					onClick={editAction.onClick}
					icon={editIcon}
					text="تعديل"
					variant="success"
				/>
			)}
		</div>
	);
};

export default ActionButtons;
