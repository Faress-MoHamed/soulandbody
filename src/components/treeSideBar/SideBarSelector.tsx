"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ListItem {
	text: string;
	href?: string;
	list?: ListItem[]; // 🔁 Nested sublist support
}

interface SideBarItem {
	text: string;
	icon?: React.ReactNode;
	href?: string;
	list?: ListItem[];
}

interface SideBarSelectorProps {
	className?: string;
	title?: string;
	content: SideBarItem[];
	showSideBar: boolean;
}

function SideBarSelector({
	className,
	title,
	content,
	showSideBar,
}: SideBarSelectorProps) {
	const path = usePathname();
	
	const local = useLocale();
	const [openIndices, setOpenIndices] = React.useState<number[]>([]);

	const toggleList = (index: number) => {
		setOpenIndices((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const isActive = (href?: string, list?: ListItem[]): boolean => {
		if (!href) return false;
		if (path === href) return true;
		if (list) {
			return list.some(
				(item) => path === item.href || isActive(item.href, item.list)
			);
		}
		return false;
	};

	const renderSublist = (list: ListItem[], depth = 1) => {
		const [openIndices, setOpenIndices] = React.useState<number[]>([]);

		const toggleList = (index: number) => {
			setOpenIndices((prev) =>
				prev.includes(index)
					? prev.filter((i) => i !== index)
					: [...prev, index]
			);
		};
		console.log(depth);

		return (
			<div
				style={{
					marginInlineStart: depth + 20,
				}}
				className={`flex flex-col transition-all duration-300 border-s-[2px]  ease-in-out  border-gray-200 `}
			>
				{list.map((subItem, subIndex) => {
					const hasSublist = subItem.list && subItem.list.length > 0;
					const isSubItemActive = isActive(subItem.href, subItem.list);

					return (
						<div key={`${depth}-${subIndex}`} className="mt-2">
							{subItem.href ? (
								<Link
									href={subItem.href}
									className={`flex ${
										local === "ar" ? "flex-row" : "flex-row-reverse"
									} items-center gap-3 p-2 rounded-lg hover:bg-[#EBF6F6] transition-colors ${
										isSubItemActive
											? "text-mainColor font-medium"
											: "text-blackBlue"
									}`}
								>
									{showSideBar && (
										<span className="text-sm whitespace-nowrap">
											{subItem.text}
										</span>
									)}
								</Link>
							) : (
								!hasSublist && (
									<div
										onClick={() => hasSublist && toggleList(subIndex)}
										className={`flex ${
											local === "ar" ? "flex-row" : "flex-row-reverse"
										} items-center gap-3 p-2 rounded-lg hover:bg-[#EBF6F6] transition-colors cursor-pointer ${
											isSubItemActive
												? "text-mainColor font-medium"
												: "text-blackBlue"
										}`}
									>
										{showSideBar && (
											<span className="text-sm whitespace-nowrap">
												{subItem.text}
											</span>
										)}
									</div>
								)
							)}
							{hasSublist && (
								<div
									onClick={() => hasSublist && toggleList(subIndex)}
									style={{
										fontWeight: 500,
									}}
									className={`flex py-2 xl:px-2 text-lg  items-center rounded-lg hover:bg-[#EBF6F6] transition-colors cursor-pointer ${
										local === "ar" ? "flex-row" : "flex-row-reverse"
									} gap-4 ${className}`}
								>
									{hasSublist && showSideBar && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleList(subIndex);
											}}
											aria-expanded={openIndices.includes(subIndex)}
											aria-controls={`sublist-${subIndex}`}
											className="focus:outline-none ms-2"
										>
											<svg
												className={`w-6 h-6 transition-transform duration-200 ${
													openIndices.includes(subIndex) ? "rotate-90" : ""
												}`}
												width="23"
												height="23"
												viewBox="0 0 23 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M14.5695 6.60743C14.8853 6.93587 14.8751 7.45813 14.5466 7.77394L10.2151 11.8542L14.5466 15.9346C14.8751 16.2504 14.8853 16.7726 14.5695 17.1011C14.2537 17.4295 13.7314 17.4397 13.403 17.1239L8.45299 12.4489C8.29122 12.2934 8.1998 12.0787 8.1998 11.8542C8.1998 11.6298 8.29122 11.4151 8.45299 11.2596L13.403 6.58456C13.7314 6.26876 14.2537 6.279 14.5695 6.60743Z"
													fill={"#333333"}
													fillOpacity="0.77"
													stroke={"#333333"}
													strokeOpacity="0.77"
													strokeWidth="0.25"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									)}
									{showSideBar && (
										<span className="md:text-[14px] text-base">
											{subItem.text}
										</span>
									)}
								</div>
							)}
							{subItem.list && (
								<div
									id={`sublist-${subIndex}`}
									style={
										{
											// marginInlineStart: depth + 25,
										}
									}
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										openIndices.includes(subIndex)
											? "max-h-[1000px] opacity-100 py-2"
											: "max-h-0 opacity-0"
									}`}
								>
									{" "}
									{subItem.list && renderSublist(subItem.list, depth + 1)}
								</div>
							)}
							{/* {subItem.list && (
								<div className="mt-1">
									fares
									{renderSublist(subItem.list, depth + 1)}
								</div>
							)} */}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="flex flex-col">
			<div className={`flex-col ${!showSideBar && "xl:pb-0"} flex gap-1`}>
				{content.map((item, index) => {
					const hasSublist = item.list && item.list.length > 0;
					const isItemActive = isActive(item.href, item.list);

					return (
						<div key={index} className="flex flex-col">
							{/* Main list item */}
							{item.href ? (
								<Link
									href={item.href}
									className={`flex py-2 xl:px-2 text-lg font-bold items-center rounded-lg hover:bg-[#EBF6F6] transition-colors ${
										isItemActive
											? "bg-[#22979917] text-mainColor"
											: "text-blackBlue"
									} ${
										local === "ar" ? "flex-row" : "flex-row-reverse"
									} gap-4 ${className}`}
								>
									{hasSublist && showSideBar ? (
										<button
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												toggleList(index);
											}}
											aria-expanded={openIndices.includes(index)}
											aria-controls={`sublist-${index}`}
											className="focus:outline-none"
										>
											<svg
												className={`w-6 h-6 transition-transform duration-200 ${
													openIndices.includes(index) ? "rotate-90" : ""
												}`}
												width="23"
												height="23"
												viewBox="0 0 23 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M14.5695 6.60743C14.8853 6.93587 14.8751 7.45813 14.5466 7.77394L10.2151 11.8542L14.5466 15.9346C14.8751 16.2504 14.8853 16.7726 14.5695 17.1011C14.2537 17.4295 13.7314 17.4397 13.403 17.1239L8.45299 12.4489C8.29122 12.2934 8.1998 12.0787 8.1998 11.8542C8.1998 11.6298 8.29122 11.4151 8.45299 11.2596L13.403 6.58456C13.7314 6.26876 14.2537 6.279 14.5695 6.60743Z"
													fill={isItemActive ? "#229799" : "#333333"}
													fillOpacity="0.77"
													stroke={isItemActive ? "#229799" : "#333333"}
													strokeOpacity="0.77"
													strokeWidth="0.25"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									) : (
										<svg
											className={`w-6 h-6 transition-transform duration-200 `}
											width="23"
											height="23"
											viewBox="0 0 23 23"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M14.5695 6.60743C14.8853 6.93587 14.8751 7.45813 14.5466 7.77394L10.2151 11.8542L14.5466 15.9346C14.8751 16.2504 14.8853 16.7726 14.5695 17.1011C14.2537 17.4295 13.7314 17.4397 13.403 17.1239L8.45299 12.4489C8.29122 12.2934 8.1998 12.0787 8.1998 11.8542C8.1998 11.6298 8.29122 11.4151 8.45299 11.2596L13.403 6.58456C13.7314 6.26876 14.2537 6.279 14.5695 6.60743Z"
												fill={"#333333"}
												fillOpacity="0.77"
												stroke={"#333333"}
												strokeOpacity="0.77"
												strokeWidth="0.25"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									)}
									{showSideBar && (
										<span className="md:text-[14px] text-base">
											{item.text}
										</span>
									)}
								</Link>
							) : (
								<div
									onClick={() => hasSublist && toggleList(index)}
									className={`flex py-2 xl:px-2 text-lg font-bold items-center rounded-lg hover:bg-[#EBF6F6] transition-colors cursor-pointer ${
										isItemActive
											? "bg-[#22979917] text-mainColor"
											: "text-blackBlue"
									} ${
										local === "ar" ? "flex-row" : "flex-row-reverse"
									} gap-4 ${className}`}
								>
									{hasSublist && showSideBar ? (
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleList(index);
											}}
											aria-expanded={openIndices.includes(index)}
											aria-controls={`sublist-${index}`}
											className="focus:outline-none"
										>
											<svg
												className={`w-6 h-6 transition-transform duration-200 ${
													openIndices.includes(index) ? "rotate-90" : ""
												}`}
												width="23"
												height="23"
												viewBox="0 0 23 23"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M14.5695 6.60743C14.8853 6.93587 14.8751 7.45813 14.5466 7.77394L10.2151 11.8542L14.5466 15.9346C14.8751 16.2504 14.8853 16.7726 14.5695 17.1011C14.2537 17.4295 13.7314 17.4397 13.403 17.1239L8.45299 12.4489C8.29122 12.2934 8.1998 12.0787 8.1998 11.8542C8.1998 11.6298 8.29122 11.4151 8.45299 11.2596L13.403 6.58456C13.7314 6.26876 14.2537 6.279 14.5695 6.60743Z"
													fill={isItemActive ? "#229799" : "#333333"}
													fillOpacity="0.77"
													stroke={isItemActive ? "#229799" : "#333333"}
													strokeOpacity="0.77"
													strokeWidth="0.25"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									) : (
										<svg
											className={`w-6 h-6 transition-transform duration-200 `}
											width="23"
											height="23"
											viewBox="0 0 23 23"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M14.5695 6.60743C14.8853 6.93587 14.8751 7.45813 14.5466 7.77394L10.2151 11.8542L14.5466 15.9346C14.8751 16.2504 14.8853 16.7726 14.5695 17.1011C14.2537 17.4295 13.7314 17.4397 13.403 17.1239L8.45299 12.4489C8.29122 12.2934 8.1998 12.0787 8.1998 11.8542C8.1998 11.6298 8.29122 11.4151 8.45299 11.2596L13.403 6.58456C13.7314 6.26876 14.2537 6.279 14.5695 6.60743Z"
												fill={"#333333"}
												fillOpacity="0.77"
												stroke={"#333333"}
												strokeOpacity="0.77"
												strokeWidth="0.25"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									)}
									{showSideBar && (
										<span className="md:text-[14px] text-base">
											{item.text}
										</span>
									)}
								</div>
							)}

							{/* Sublist */}
							{hasSublist && showSideBar && (
								<div
									id={`sublist-${index}`}
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										openIndices.includes(index)
											? "max-h-[1000px] opacity-100 py-2"
											: "max-h-0 opacity-0"
									}`}
								>
									{item.list && renderSublist(item.list, 1)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SideBarSelector;
