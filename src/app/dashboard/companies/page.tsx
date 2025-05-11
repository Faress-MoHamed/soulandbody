"use client";

import React from "react";
import CustomHomeCard from "./components/CustomHomeCard";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function Page() {
	const { t } = useTypedTranslation();

	const HomeCards = [
		{
			title: t("salesInvoices.card1.title"),
			subTitle: t("salesInvoices.card1.subTitle"),
			Icon: "/companies/SalesInvoices.png",
			LinkUrl: "/dashboard/companies/SalesInvoices",
		},
		{
			title: t("salesInvoices.card2.title"),
			subTitle: t("salesInvoices.card2.subTitle"),
			Icon: "/companies/Returns&Exchanges.png",
			LinkUrl: "/dashboard/companies/ReturnsAndExchanges",
		},
		{
			title: t("salesInvoices.card3.title"),
			subTitle: t("salesInvoices.card3.subTitle"),
			Icon: "/companies/Products.png",
			LinkUrl: "/dashboard/companies/Products",
		},
		{
			title: t("salesInvoices.card4.title"),
			subTitle: t("salesInvoices.card4.subTitle"),
			Icon: "/companies/Employees.png",
			LinkUrl: "/dashboard/companies/Employees",
		},
		{
			title: t("salesInvoices.card5.title"),
			subTitle: t("salesInvoices.card5.subTitle"),
			Icon: "/companies/Customers.png",
			LinkUrl: "/dashboard/companies/Customers",
		},
		{
			title: t("salesInvoices.card6.title"),
			subTitle: t("salesInvoices.card6.subTitle"),
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
