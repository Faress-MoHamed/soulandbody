"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import NotificationsSheet from "./NotificationSheet";

export function DropdownMenuCheckboxes() {
	const [ischoosed, setIschoosed] = useState("");
	const locale = useLocale();
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
	const handleChange = (item: any) => {
		const selectedlocale = item.key;
		setIschoosed(selectedlocale);
		document.cookie = `locale=${selectedlocale}; path=/`;
		window.location.reload();
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
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
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Languages</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{languageOptions?.map((item) => (
					<DropdownMenuCheckboxItem
						key={item?.id}
						onClick={() => handleChange(item)}
						checked={actualValue?.key === item?.key}
					>
						<Link
							href={`/`}
							className="flex text-white px-3  py-2 items-center justify-between border-b last:border-b-0
                         border-[#E5E5E5B8] cursor-pointer "
						>
							<div className=" flex items-end gap-[6px]">
								<img src={item?.image} width={26} height={19} />
								<div className="text-black text-[12px]">{item?.label}</div>
							</div>
						</Link>
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default function Header() {
	return (
		<div className="flex lg:flex-row flex-col justify-between lg:gap-0 gap-2 lg:items-center lg:px-12">
			{/* logo */}
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
				<p className="md:text-[24px] text-[20px]">مرحبا بك في شركة SB</p>
			</Link>
			{/* seatch */}
			<div className="relative text-black lg:block hidden">
				<Search className="absolute right-3 top-3.5 h-4 w-4 text-black" />
				<Input
					placeholder="ابحث هنا"
					className="pr-9 min-w-[360px] h-[46px] max-[720px] rounded-[16px] lg:w-1/3 bg-[#007DFC1A] border-none placeholder:text-black"

					// value={globalFilter}
					// onChange={(e) => setGlobalFilter(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-1 font-bold">
				<Image
					height={47}
					width={47}
					src="/image.png"
					className="w-[47px] h-[47px]"
					alt=""
				/>
				<p className="text-[18px] font-cairo">د/احمد ابراهيم</p>
			</div>
			<div className="flex gap-2 items-center">
				<DropdownMenuCheckboxes />
				<NotificationsSheet/>
			</div>
		</div>
	);
}
