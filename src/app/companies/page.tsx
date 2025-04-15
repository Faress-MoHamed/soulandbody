"use client";

import React from "react";
import CustomHomeCard from "./components/CustomHomeCard";


export default function Page() {
	const HomeCards: {
		title?: string;
		subTitle?: string;
		Icon?: any;
		LinkUrl?: any;
	}[] = [
		{
			title: "فواتير بيع",
			subTitle: "تسجيل كافة الحركات المالية اليومية مثل المبيعات والمشتريات.",
			Icon: "/companies/SalesInvoices.png",
			LinkUrl: "/companies/SalesInvoices",
		},
		{
			title: "استبدال ومرتجعات",
			subTitle: "عرض حركات الحسابات المختلفة",
			Icon: "/companies/Returns&Exchanges.png",
			LinkUrl: "/companies/ReturnsAndExchanges",
		},
		{
			title: "المنتجات",
			subTitle: "إدارة الفواتير وعمليات البيع وكشف حساب",
			Icon: "/companies/Products.png",
			LinkUrl: "/companies/Products",
		},
		{
			title: "الموظفين",
			subTitle: "سجل مشترياتك من الموردين وإدارة الفواتير المستحقة وكشف حساب",
			Icon: "/companies/Employees.png",
			LinkUrl: "/companies/Employees",
		},
		{
			title: "العملاء",
			subTitle: "إدارة المخزون ومتابعة الكميات المتوفرة من المنتجات",
			Icon: "/companies/Customers.png",
			LinkUrl: "/companies/Customers",
		},
		{
			title: "تقارير",
			subTitle: "إدارة الحركات المالية النقدية والحسابات البنكية",
			Icon: "/companies/Reports.png",
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
