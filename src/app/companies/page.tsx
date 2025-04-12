import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CustomHomeCard = ({
	title,
	subTitle,
	Icon,
	LinkUrl,
}: {
	title?: string;
	subTitle?: string;
	Icon?: any;
	LinkUrl?: any;
}) => {
	return (
		<Link
			href={LinkUrl || "/"}
			className="p-6 rounded-[8px] shadow-md flex flex-col md:w-[435px] md:h-[251px] bg-white"
		>
			<div className="w-[64px] h-[64px] self-end">
				<Image src={Icon} alt="icon" width={64} height={64} />
			</div>

			<div className="gap-4 flex flex-col">
				<h1 className="text-[26px] font-[700] text-[#042719]">{title}</h1>
				<h1 className="text-[24px] font-[400] text-[#042719]">{subTitle} </h1>
			</div>
		</Link>
	);
};

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
		},
		{
			title: "المنتجات",
			subTitle: "إدارة الفواتير وعمليات البيع وكشف حساب",
			Icon: "/companies/Products.png",
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
