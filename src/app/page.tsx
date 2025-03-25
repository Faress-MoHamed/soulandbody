"use client";

import { DashboardCard } from "@/components/dashboardCard";
import CustomPopUp from "@/components/popups";
import WarningPopUp from "@/components/warningPopUp";
import Image from "next/image";

export default function Home() {
	const dashboardItems = [
		{
			title: "الموظفين",
			icon: "/icons/employee.png",
			href: "/employees",
		},
		{
			title: "بيانات موظف",
			icon: "/icons/emplyeeDetails.png",
			href: "/employee-data",
		},
		{
			title: "الدرجات المالية بشؤون الموظفين",
			icon: "/icons/fainancalEmployeeDetails.png",
			href: "/financial-grades",
		},
		{
			title: "ساعات دوام الشركة",
			icon: "/icons/jobTime.png",
			href: "/work-hours",
		},
		{
			title: "استئذان",
			icon: "/icons/execuse.png",
			href: "/permission",
		},
		{
			title: "وقت راحة",
			icon: "/icons/breakTime.png",
			href: "/break-time",
		},
		{
			title: "سجلات حضور",
			icon: "/icons/Time.png",
			href: "/attendance",
		},
		{
			title: "إجازات",
			icon: "/icons/warnings.png",
			href: "/vacations",
		},
		{
			title: "إجازات تأديبية",
			icon: "/icons/warnings.png",
			DialogContentComponent: () => <WarningPopUp />,
		},
	];
	return (
		<>
			{/* <CustomPopUp
				DialogTriggerComponent={() => {
					return <p>fares</p>;
				}}
				DialogContentComponent={() => {
					return <WarningPopUp/>;
				}}
			/> */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{dashboardItems.map((item) => (
					<DashboardCard
						key={item.href}
						title={item.title}
						icon={item.icon}
						href={item.href}
						DialogContentComponent={item?.DialogContentComponent}
					/>
				))}
			</div>
		</>
	);
}
