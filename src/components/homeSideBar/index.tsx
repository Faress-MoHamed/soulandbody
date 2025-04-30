import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SideBarSelector from "./SideBarSelector";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function HomeSideBar() {
	const HomeCards = [
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
		{
			title: "فارس",
			linkeUr: "/",
		},
	];
	const { t } = useTypedTranslation();
	const content = [
		{
			text: "قيود يومية",
			icon: <Home />,
			list: [
				{
					text: "إضافة قيد يومي جديد",
					// href: "/daily",
					list: [
						{
							text: "التفاصيل",
							href: "/daily/details",
						},
						{
							text: "المرفقات",
							list: [
								{
									text: "إضافة قيد يومي جديد",
									list: [
										{
											text: "التفاصيل",
											// href: "/daily/details",
										},
										{
											text: "المرفقات",
											// href: "/daily/files",
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			text: "الاأيرادات",
			href: `/products`,
			list: [
				{
					text: "dashboardSideBar.products.allproducts",
					href: `/products`,
				},
				{
					text: "dashboardSideBar.products.addProducts",
					href: `/products/create`,
				},
				{
					text: "dashboardSideBar.products.productCategories",
					href: `/products/category`,
				},
				{
					text: "dashboardSideBar.products.ProductSubCategory",
					href: `/products/subCategory`,
				},
				// {
				//   text: t('dashboardSideBar.products.coupones',
				//   href: `/products/coupons`,
				// },
			],
		},
		{
			text: "المصروفات",
			list: [
				{
					text: "dashboardSideBar.products.coupones",
					href: `/products/coupons`,
				},
				{
					text: "dashboardSideBar.products.coupones",
					href: `/products/coupons`,
				},
				// {
				//   text: t('dashboardSideBar.products.coupones',
				//   href: `/products/coupons`,
				// },
			],
		},
		{
			text: "المخزن",
			icon: <Home size={22} className=" text-mainColor" />,
		},
		{
			text: "البنوك والخزينة",
			icon: <Home size={22} className=" text-mainColor" />,
			list: [
				{
					text: "dashboardSideBar.settings.userManagement",
					href: `/settings/roles`,
				},
				{
					text: "dashboardSideBar.settings.PaymentManagement",
					href: `/settings/payment`,
				},
			],
		},
		{
			text: "المشتريات",
			icon: <Home size={22} className=" text-mainColor" />,
			// list: [
			// 	{
			// 		text: "dashboardSideBar.settings.userManagement",
			// 		href: `/settings/roles`,
			// 	},
			// 	{
			// 		text: "dashboardSideBar.settings.PaymentManagement",
			// 		href: `/settings/payment`,
			// 	},
			// ],
		},
		{
			text: " إدارة الموارد البشرية",
			icon: <Home size={22} className=" text-mainColor" />,
			// list: [
			// 	{
			// 		text: "dashboardSideBar.settings.userManagement",
			// 		href: `/settings/roles`,
			// 	},
			// 	{
			// 		text: "dashboardSideBar.settings.PaymentManagement",
			// 		href: `/settings/payment`,
			// 	},
			// ],
		},
		{
			text: " التقارير",
			icon: <Home size={22} className=" text-mainColor" />,
			list: [
				{
					text: "dashboardSideBar.settings.userManagement",
					href: `/settings/roles`,
				},
				{
					text: "dashboardSideBar.settings.PaymentManagement",
					href: `/settings/payment`,
				},
			],
		},
		{
			text: " اعدادات النظام",
			icon: <Home size={22} className=" text-mainColor" />,
			list: [
				{
					text: "dashboardSideBar.settings.userManagement",
					href: `/settings/roles`,
				},
				{
					text: "dashboardSideBar.settings.PaymentManagement",
					href: `/settings/payment`,
				},
			],
		},
	];

	return (
		<Sidebar side={t("dir") === "rtl" ? "right" : "left"} className="bg-white">
			<SidebarContent>
				<SidebarGroup>
					<SidebarHeader className="flex justify-center items-center">
						<svg
							width="111"
							height="111"
							viewBox="0 0 111 111"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_2510_11966)">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M70.9171 32.4267C66.3536 29.3775 60.9884 27.75 55.5 27.75V0C66.4768 0 77.2072 3.25502 86.3341 9.35344C95.4611 15.4518 102.575 24.1198 106.775 34.261C110.976 44.4022 112.075 55.5616 109.934 66.3275C107.792 77.0934 102.506 86.9827 94.7443 94.7443C86.9827 102.506 77.0934 107.792 66.3275 109.934C55.5616 112.075 44.4022 110.976 34.261 106.775C24.1198 102.575 15.4518 95.4611 9.35344 86.3341C3.25502 77.2072 0 66.4768 0 55.5H27.75C27.75 60.9884 29.3775 66.3536 32.4267 70.9171C35.4759 75.4806 39.8099 79.0373 44.8806 81.1377C49.9511 83.2381 55.5308 83.7875 60.9137 82.7166C66.2967 81.646 71.2412 79.0031 75.1223 75.1223C79.0031 71.2412 81.646 66.2967 82.7166 60.9137C83.7875 55.5308 83.2381 49.9511 81.1377 44.8806C79.0373 39.8099 75.4806 35.4759 70.9171 32.4267Z"
									fill="#007DFC"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M27.75 1.20192e-05C27.75 3.6442 27.0322 7.2527 25.6377 10.6195C24.2431 13.9863 22.199 17.0454 19.6222 19.6222C17.0454 22.1991 13.9863 24.2431 10.6195 25.6377C7.25267 27.0322 3.64417 27.75 1.21298e-06 27.75L0 55.5C7.28836 55.5 14.5054 54.0645 21.2389 51.2754C27.9725 48.4862 34.0909 44.3981 39.2443 39.2443C44.398 34.0909 48.4862 27.9726 51.2753 21.2389C54.0645 14.5054 55.5 7.28835 55.5 0L27.75 1.20192e-05Z"
									fill="#007DFC"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2510_11966">
									<rect width="111" height="111" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</SidebarHeader>
					<SidebarGroupContent>
						<SidebarMenu>
							<SideBarSelector content={content} showSideBar={true} />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
