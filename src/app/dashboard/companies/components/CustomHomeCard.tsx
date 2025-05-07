// components/CustomHomeCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	title?: string;
	subTitle?: string;
	Icon?: any;
	LinkUrl?: any;
};

const CustomHomeCard = ({ title, subTitle, Icon, LinkUrl }: Props) => {
	return (
		<Link
			href={LinkUrl || "/"}
			className="p-6 rounded-[8px] shadow-md flex flex-col md:w-[435px] w-full md:h-[251px] bg-white"
		>
			<div className="w-[64px] h-[64px] self-end">
				<Image src={Icon} alt="icon" width={64} height={64} />
			</div>
			<div className="gap-4 flex flex-col">
				<h1 className="text-[26px] font-[700] text-[#042719]">{title}</h1>
				<h1 className="text-[24px] font-[400] text-[#042719]">{subTitle}</h1>
			</div>
		</Link>
	);
};

export default CustomHomeCard;
