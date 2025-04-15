"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InOutPopUp from "./execuse/components/InAndOutPopUp";
import CustomPopUp from "@/components/popups";
import Attendance from "./components/attendance";
import { CustomHomeCard } from "./components/CustomHomeCard";



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
