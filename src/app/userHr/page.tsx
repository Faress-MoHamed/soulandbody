"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InOutPopUp from "./execuse/components/InAndOutPopUp";
import CustomPopUp from "@/components/popups";
import Attendance from "./components/attendance";

export const CustomHomeCard = ({
	title,
	Icon,
	LinkUrl,
	Component,
}: {
	title?: string;
	Icon?: any;
	LinkUrl?: any;
	Component?: any;
}) => {
	return Component ? (
		<CustomPopUp
			DialogTriggerComponent={() => (
				<div className="p-6 rounded-[8px] shadow-md flex md:flex-row flex-col items-center justify-between md:w-[435px] w-full md:h-[251px] bg-white">
					<h1 className="text-[26px] font-[700] text-[#042719]">{title}</h1>
					<div className="w-[64px] h-[64px]">
						<Image src={Icon} alt="icon" width={64} height={64} />
					</div>
				</div>
			)}
			DialogContentComponent={() => Component}
		/>
	) : (
		<Link
			href={LinkUrl || "/"}
			className="p-6 rounded-[8px] shadow-md flex md:flex-row flex-col items-center justify-between md:w-[435px] w-full md:h-[251px] bg-white"
		>
			<h1 className="text-[26px] font-[700] text-[#042719]">{title}</h1>
			<div className="w-[64px] h-[64px]">
				<Image src={Icon} alt="icon" width={64} height={64} />
			</div>
		</Link>
	);
};

export default function Page() {
	const HomeCards: {
		title?: string;
		Component?: any;
		Icon?: any;
		LinkUrl?: any;
	}[] = [
		{
			title: "حضور / أنصراف",
			Icon: "/userHr/attendance.png",
			Component: <Attendance />,
		},
		{
			title: "ساعات دوام الشركة",
			Icon: "/userHr/Workinghours.png",
		},
		{
			title: "بياناتك",
			Icon: "/userHr/details.png",
		},
		{
			title: "اجازات",
			Icon: "/userHr/vacations.png",
		},
		{
			title: "أستاذان",
			Icon: "/userHr/execuse.png",
			LinkUrl: "/userHr/execuse",
		},
		{
			title: "وقت راحة",
			Icon: "/userHr/breakTime.png",
		},
	];
	return (
		<div className="flex flex-wrap gap-6">
			{HomeCards.map((el) => (
				<CustomHomeCard key={el?.title} {...el} />
			))}
		</div>
	);
}
