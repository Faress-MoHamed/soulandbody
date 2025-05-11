"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
// import {
// 	DropdownMenu,
// 	DropdownMenuCheckboxItem,
// 	DropdownMenuContent,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import NotificationsSheet from "./NotificationSheet";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import HomeSideBar from "../homeSideBar";
import { SidebarTrigger } from "../ui/sidebar";
import { SearchSelect } from "../SearchSelect";
import { HrOptions, UserHrOptions, userOptions } from "@/lib/config";
import LogoutButton from "../LogoutButton";

export function DropdownMenuCheckboxes() {
	const [ischoosed, setIschoosed] = useState("");
	const locale = useLocale();
	const { t } = useTypedTranslation();

	const languageOptions = [
		{
			id: 1,
			label: "العربية",
			key: "ar",
			image: "/languages/ar.png",
		},
		{
			id: 2,
			label: "English",
			key: "en",
			image: "/languages/uk.svg",
		},
	];

	const selectedLanguage = languageOptions.find(
		(item) => item.key === ischoosed
	);
	const actualValue = languageOptions.find((item) => item.key === locale);

	const handleChange = () => {
		// Toggle between Arabic and English when the button is clicked
		const nextLanguage = actualValue?.key === "en" ? "ar" : "en";
		const selectedlocale = nextLanguage;
		setIschoosed(selectedlocale);
		document.cookie = `locale=${selectedlocale}; path=/`;
		window.location.reload();
	};

	return (
		<button
			// className="bg-blue-500 text-white px-4 py-2 rounded"
			onClick={handleChange}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_2278_2545)">
					<path
						d="M12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1M12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1M12 23C15 23 16 18 16 12C16 6 15 1 12 1M12 23C9 23 8 18 8 12C8 6 9 1 12 1M2 16H22M2 8H22"
						stroke="black"
						strokeWidth="2"
					/>
				</g>
				<defs>
					<clipPath id="clip0_2278_2545">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</button>
	);
}

export default function Header({
	OtherComponent,
}: {
	OtherComponent?: React.FC;
}) {
	const { t } = useTypedTranslation();

	const translatedItems = HrOptions.map(item => ({
		...item,
		title: t(item.title as any) // Apply translation function
	  }));
	const translatedUserHrOptions = UserHrOptions.map(item => ({
		...item,
		title: t(item.title as any) // Apply translation function
	  }));
	return (
		<div className="flex lg:flex-row flex-col justify-between lg:gap-3 gap-2 lg:items-center ">
			{/* logo */}
			<div className="flex gap-5">
				<SidebarTrigger>fares</SidebarTrigger>
				<Link href={"/"} className="max-w-full flex items-center gap-[13px]">
					<div className="max-w-full rounded-full">
						<Image
							width={27}
							height={27}
							src="/logo.svg"
							className="w-[27px] h-[27px]"
							alt=""
						/>
					</div>
					<p className="md:text-[24px] text-[20px]">{t("header.welcome")}</p>
				</Link>
			</div>

			<SearchSelect
				options={[...translatedItems,...userOptions,...translatedUserHrOptions]}
			/>
			<div className="flex items-center gap-1 font-bold">
				<Image
					height={47}
					width={47}
					src="/image.png"
					className="w-[47px] h-[47px]"
					alt=""
				/>
				<p className="text-[18px] font-cairo">{t("header.dr")}</p>
			</div>
			<div className="flex gap-6 items-center">
				<DropdownMenuCheckboxes />
				<NotificationsSheet />
				<LogoutButton/>
			</div>
		</div>
	);
}
