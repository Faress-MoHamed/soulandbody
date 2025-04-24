"use client";

import { DashboardCard } from "@/components/dashboardCard";
import WarningPopUp from "@/components/warningPopUp";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function Home() {
  const { t } = useTypedTranslation();

  const dashboardItems = [
    {
      title: t("home.employees"),
      icon: "/icons/employee.png",
      href: "/hr/employees",
    },
    {
      title: t("home.employeeData"),
      icon: "/icons/emplyeeDetails.png",
      href: "/hr/employee-data",
    },
    {
      title: t("home.financialGrades"),
      icon: "/icons/fainancalEmployeeDetails.png",
      href: "/hr/financial-grades",
    },
    {
      title: t("home.workHours"),
      icon: "/icons/jobTime.png",
      href: "/hr/work-hours",
    },
    {
      title: t("home.permission"),
      icon: "/icons/execuse.png",
      href: "/hr/permission",
    },
    {
      title: t("home.breakTime"),
      icon: "/icons/breakTime.png",
      href: "/hr/break-time",
    },
    {
      title: t("home.attendance"),
      icon: "/icons/Time.png",
      href: "/hr/attendance",
    },
    {
      title: t("home.vacations"),
      icon: "/icons/warnings.png",
      href: "/hr/vacations",
    },
    {
      title: t("home.disciplinaryVacations"),
      icon: "/icons/warnings.png",
      DialogContentComponent: () => <WarningPopUp />,
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
