"use client";

import { DashboardCard } from "@/components/dashboardCard";
import WarningPopUp from "@/components/warningPopUp";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";
import CustomHomeCard from "../companies/components/CustomHomeCard";
import HomeSideBar from "@/components/homeSideBar";

export default function Home() {
	const { t } = useTypedTranslation();

	const dashboardItems = [
		{
			title: "المبيعات",
			subTitle: "إدارة الفواتير وعمليات البيع ومخزونات الحساب",
			Icon: "/user/sales.png",
			LinkUrl: "/user/sales",
		},
		{
			title: "حركات الحسابات",
			subTitle: "عرض جميع حركات الحسابات المختلفة",

			Icon: "/user/transactions.png",
			LinkUrl: "/user/sales",
		},
		{
			title: "قيود يومية",
			subTitle: "تسجيل كافة الحركات المالية اليومية بين الحسابات والمشتريات",
			Icon: "/user/dailyEntries.png",
			LinkUrl: "/user/sales",
		},
		{
			title: "الخزينة والبنوك",
			subTitle: "إدارة الحركات المالية النقدية والحسابات البنكية",
			Icon: "/user/treasuryAndBanks.png",
			LinkUrl: "/user/banks",
		},
		{
			title: "المشتريات",
			subTitle:
				"تسجيل مشتريات من الموردين وإدارة الفواتير المستلمة والمدفوعات حساب",
			Icon: "/user/purchases.png",
			LinkUrl: "/user/purchases",
		},
		{
			title: "المخزن",
			subTitle: "إدارة المخازن ومتابعة الكميات المتواجدة من المنتجات",
			Icon: "/user/inventory.png",
			LinkUrl: "/user/warehouses",
		},
		{
			title: "إدارة الموارد البشرية",
			subTitle: "إدارة الموظفين والرواتب والحضور والغياب",
			Icon: "/user/hr.png",
			LinkUrl: "/user/sales",
		},
		{
			title: "التقارير",
			subTitle: "عرض وتحليل البيانات المالية من خلال تقارير مختلفة",
			Icon: "/user/reports.png",
			LinkUrl: "/user/reports",
		},
		{
			title: "المصروفات",
			subTitle: "تسجيل جميع المصروفات مثل الرواتب والإيجارات والخدمات",
			Icon: "/user/expenses.png",
			LinkUrl: "/user/expenses",
		},
	];

	return (
		<>
			<div className="flex flex-wrap justify-center gap-6">
				{dashboardItems.map((el) => (
					<CustomHomeCard key={el?.title} {...el} />
				))}
			</div>
		</>
	);
}
