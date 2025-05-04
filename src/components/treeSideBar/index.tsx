"use client";

import { Home } from "lucide-react";
import headimg from "./3436312 1.png";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SideBarSelector from "./SideBarSelector";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomPopUp from "../popups";
import MovementAccountTopComponent from "@/app/user/movementacount/components/MovementAccount";
export default function TreeSideBar() {
	const { t } = useTypedTranslation();
	const [contextMenu, setContextMenu] = useState<{
		visible: boolean;
		targetElement: HTMLElement | null;
	}>({
		visible: false,
		targetElement: null,
	});

	// مرجع للقائمة المنبثقة
	const contextMenuRef = useRef<HTMLUListElement | null>(null);

	// التعامل مع الكليك يمين
	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setContextMenu({
			visible: true,
			targetElement: e.currentTarget as HTMLElement,
		});
	};

	// التعامل مع الكليك خارج
	const handleClickOutside = (e: MouseEvent) => {
		if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
			setContextMenu({ visible: false, targetElement: null });
		}
	};

	// إضافة مستمع للكليك خارج
	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	// حساب موضع القائمة المنبثقة
	const getContextMenuPosition = () => {
		if (!contextMenu.targetElement) return { top: 0, left: 0 };

		const rect = contextMenu.targetElement.getBoundingClientRect();
		return {
			top: rect.top + window.scrollY,
			left: rect.right + window.scrollX + 5, // 5px فراغ بين العنصر والقائمة
		};
	};
	const content = [
		{
			text: "قيود يومية",
			icon: <Home className="relative" />,
			list: [
				{
					text: "إضافة قيد يومي جديد",
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
										{ text: "التفاصيل" },
										{ text: "المرفقات" },
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
				{ text: "dashboardSideBar.products.allproducts", href: `/products` },
				{ text: "dashboardSideBar.products.addProducts", href: `/products/create` },
				{ text: "dashboardSideBar.products.productCategories", href: `/products/category` },
				{ text: "dashboardSideBar.products.ProductSubCategory", href: `/products/subCategory` },
			],
		},
		{
			text: "المصروفات",
			list: [
				{ text: "dashboardSideBar.products.coupones", href: `/products/coupons` },
				{ text: "dashboardSideBar.products.coupones", href: `/products/coupons` },
			],
		},
		{
			text: "البنوك والخزينة",
			icon: <Home size={22} className=" text-mainColor" />,
			list: [
				{ text: "dashboardSideBar.settings.userManagement", href: `/settings/roles` },
				{ text: "dashboardSideBar.settings.PaymentManagement", href: `/settings/payment` },
			],
		},
		{
			text: " التقارير",
			icon: <Home size={22} className=" text-mainColor" />,
			list: [
				{ text: "dashboardSideBar.settings.userManagement", href: `/settings/roles` },
				{ text: "dashboardSideBar.settings.PaymentManagement", href: `/settings/payment` },
			],
		},
		{
			text: " اعدادات النظام",
			icon: <Home size={22} className=" text-mainColor" />,
			list: [
				{ text: "dashboardSideBar.settings.userManagement", href: `/settings/roles` },
				{ text: "dashboardSideBar.settings.PaymentManagement", href: `/settings/payment` },
			],
		},
	];

	return (
		<div className="bg-white shadow-lg border-r border-gray-100 w-full h-full">
			<div className="p-4 h-full" onContextMenu={handleContextMenu}>
				<div className="mb-4 border-b pb-3">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-3">
							<div className="text-xl font-bold text-gray-800">شجرة الحسابات</div>
							<Image
								src={headimg}
								alt="headImg"
								width={45}
								height={45}
								className="rounded-full border border-gray-200 shadow-sm"
							/>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<SideBarSelector content={content} showSideBar={true} />
				</div>
			</div>

			{/* محتوى القائمة المنبثقة */}
			{contextMenu.visible && (
				<ul
					ref={contextMenuRef}
					className="fixed z-50 bg-white border rounded shadow-md w-32 text-sm"
					style={{
						top: `${getContextMenuPosition().top}px`,
						left: `${getContextMenuPosition().left}px`,
					}}
				>
					<div className="flex items-end">
						<CustomPopUp
							DialogTriggerComponent={() => (
								<ul>
									<li className="p-2 hover:bg-gray-100 cursor-pointer">اضافة</li>
									<li className="p-2 hover:bg-gray-100 cursor-pointer">عرض</li>
									<li className="p-2 hover:bg-gray-100 cursor-pointer">تعديل</li>
								</ul>
							)}
							DialogContentComponent={({ closePopup }) => (
								<div className="p-6 bg-white rounded-md w-full max-w-[600px]">
									<MovementAccountTopComponent />
								</div>
							)}
						/>
					</div>

					<li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500">حذف</li>
				</ul>
			)}
		</div>
	);
}