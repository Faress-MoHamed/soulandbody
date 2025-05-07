"use client";

import { DashboardCard } from "@/components/dashboardCard";
import WarningPopUp from "@/components/warningPopUp";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function Home() {
	const { t } = useTypedTranslation();

	const dashboardItems = [
		{
			title: t("home.employees"),
			icon: "/icons/employee.png",
			href: "/dashboard/hr/employees",
		},
		{
			title: t("home.employeeData"),
			icon: "/icons/emplyeeDetails.png",
			href: "/dashboard/hr/employee-data",
		},
		{
			title: t("home.financialGrades"),
			icon: "/icons/fainancalEmployeeDetails.png",
			href: "/dashboard/hr/financial-grades",
		},
		{
			title: t("home.workHours"),
			icon: "/icons/jobTime.png",
			href: "/dashboard/hr/work-hours",
		},
		{
			title: t("home.permission"),
			icon: "/icons/execuse.png",
			href: "/dashboard/hr/permission",
		},
		{
			title: t("home.breakTime"),
			icon: "/icons/breakTime.png",
			href: "/dashboard/hr/break-time",
		},
		{
			title: t("home.attendance"),
			icon: "/icons/Time.png",
			href: "/dashboard/hr/attendance",
		},
		{
			title: t("home.vacations"),
			icon: "/icons/warnings.png",
			href: "/dashboard/hr/vacations",
		},
		{
			title: t("home.disciplinaryVacations"),
			icon: "/icons/warnings.png",
			DialogContentComponent: ({ closePopup }: { closePopup?:any}) => (
				<WarningPopUp closePopup={closePopup} />
			),
		},
	];

	return (
		<>
			<div className="flex flex-wrap gap-6 justify-center lg:flex-row flex-col">
				{dashboardItems.map((item) => (
					<DashboardCard
						key={item.href ?? item.title}
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
