"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InOutPopUp from "./execuse/components/InAndOutPopUp";
import CustomPopUp from "@/components/popups";
import Attendance from "./components/attendance";
import { CustomHomeCard } from "./components/CustomHomeCard";
import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations("userHr");

	const HomeCards: {
		title?: string;
		Component?: any;
		Icon?: any;
		LinkUrl?: any;
	}[] = [
		{
			title: t("attendance"),
			Icon: "/userHr/attendance.png",
			Component: <Attendance />,
		},
		{
			title: "ساعات دوام الموظف",
			Icon: "/userHr/Workinghours.png",
			LinkUrl: "/dashboard/userHr/work-hours",
		},
		{
			title: t("yourData"),
			Icon: "/userHr/details.png",
			LinkUrl: "/dashboard/userHr/employee-data",
		},
		{
			title: t("vacations"),
			Icon: "/userHr/vacations.png",
			LinkUrl: "/dashboard/userHr/vacations",
		},
		{
			title: t("execuse"),
			Icon: "/userHr/execuse.png",
			LinkUrl: "/dashboard/userHr/execuse",
		},
		{
			title: "سجل حضور الموظف",
			Icon: "/icons/Time.png",
			LinkUrl: "/dashboard/userHr/userAttendance",
		},
	];

	return (
		<div className="flex justify-center flex-wrap gap-6">
			{HomeCards.map((el) => (
				<CustomHomeCard key={el?.title} {...el} />
			))}
		</div>
	);
}
