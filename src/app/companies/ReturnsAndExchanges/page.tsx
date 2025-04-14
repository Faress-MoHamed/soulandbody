"use client";

import CustomPopUp from "@/components/popups";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import TaxOnInvoice from "../SalesInvoices/components/TaxOnInvoice";
import TaxOnProduct from "../SalesInvoices/components/TaxOnProduct";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import FinalInvoicesTable from "../SalesInvoices/components/FinalInvoicesTable";
import ReturnsTable from "./component/ReturnsTable";
// Function to generate random data
const generateRandomData = (count: number) => {
	const items = [];
	const itemNames = ["لاب توب", "هاتف", "شاشة", "لوحة مفاتيح", "ماوس"];
	const taxOptions = ["إضافة ضريبة", "بدون ضريبة"];

	for (let i = 0; i < count; i++) {
		items.push({
			code: Math.floor(Math.random() * 100).toString(),
			itemName: itemNames[Math.floor(Math.random() * itemNames.length)],
			quantity: (Math.floor(Math.random() * 10) + 1).toString(),
			unit: (Math.floor(Math.random() * 5) + 1).toString(),
			saleUnit: (Math.floor(Math.random() * 1000) + 100).toString(),
			total: (Math.floor(Math.random() * 5000) + 500).toString(),
			discount: Math.floor(Math.random() * 30).toString(),
			tax: "إضافة ضريبة",
			totalSale: (Math.floor(Math.random() * 4000) + 400).toString(),
		});
	}
	return items;
};

export default function ReturnsAndExchanges() {
	const [selectedInvoice, setSelectedInvoice] = useState<string>("");
	const allData = generateRandomData(5); // Generate 100 random rows
	// Empty row data
	const emptyRow = {
		code: "-",
		itemName: "-",
		quantity: "-",
		unit: "-",
		saleUnit: "-",
		total: "-",
		discount: "-",
		tax: "-",
		totalSale: "-",
	};

	const Returnscolumns: ColumnDef<(typeof allData)[0]>[] = [
		{
			accessorKey: "id",
			header: () => (
				<div className="flex justify-center">
					<svg
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.5 12H16.5M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z"
							stroke="#16C47F"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			),
			cell: (props) => {
				return (
					<svg
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.5 12H16.5M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z"
							stroke="#16C47F"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				);
			},
		},
		{
			accessorKey: "code",
			header: "الكود",
		},
		{
			accessorKey: "itemName",
			header: "اسم الصنف",
		},
		{
			accessorKey: "quantity",
			header: "الكمية",
		},
		// {
		// 	accessorKey: "unit",
		// 	header: "وحدة القياس",
		// },
		{
			accessorKey: "unit",
			header: "وحدة الشراء",
		},
		{
			accessorKey: "total",
			header: "الإجمالي",
		},
		{
			accessorKey: "discount",
			header: "الخصم",
		},
		{
			accessorKey: "tax",
			header: "الضريبة",
			cell: ({ row }) =>
				row.original.tax === "إضافة ضريبة" ? (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<span
								style={{
									color:
										row.original.tax === "إضافة ضريبة" ? "green" : "inherit",
									cursor: "pointer",
									textDecoration: "underline",
								}}
							>
								{row.original.tax}
							</span>
						)}
						DialogContentComponent={() => <TaxOnProduct />}
					/>
				) : (
					<span>{row.original.tax}</span>
				),
		},
		{
			accessorKey: "totalSale",
			header: "إجمالي البيع",
		},
	];
	const Exchangecolumns: ColumnDef<(typeof allData)[0]>[] = [
		{
			accessorKey: "id",
			header: () => (
				<div className="flex justify-center">
					<svg
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.499 3.75C12.499 3.55109 12.5781 3.36032 12.7187 3.21967C12.8594 3.07902 13.0501 3 13.249 3H16.249C17.2436 3 18.1974 3.39509 18.9007 4.09835C19.6039 4.80161 19.999 5.75544 19.999 6.75V9.435L21.724 7.71C21.8655 7.57338 22.0549 7.49779 22.2516 7.49949C22.4482 7.5012 22.6363 7.58008 22.7754 7.71914C22.9145 7.85819 22.9933 8.0463 22.995 8.24295C22.9967 8.4396 22.9212 8.62905 22.7845 8.7705L19.7845 11.7705C19.6439 11.9111 19.4532 11.9901 19.2543 11.9901C19.0554 11.9901 18.8647 11.9111 18.724 11.7705L15.724 8.7705C15.5874 8.62905 15.5118 8.4396 15.5135 8.24295C15.5152 8.0463 15.5941 7.85819 15.7332 7.71914C15.8722 7.58008 16.0603 7.5012 16.257 7.49949C16.4536 7.49779 16.6431 7.57338 16.7845 7.71L18.5095 9.435V6.75C18.5095 6.15326 18.2725 5.58097 17.8505 5.15901C17.4286 4.73705 16.8563 4.5 16.2595 4.5H13.2595C13.0606 4.5 12.8699 4.42098 12.7292 4.28033C12.5886 4.13968 12.5095 3.94891 12.5095 3.75H12.499ZM5.46403 12.06C5.55347 12.023 5.64924 12.0036 5.74603 12.003H5.75503C5.95252 12.0038 6.14171 12.0825 6.28153 12.222L9.28153 15.222C9.41815 15.3635 9.49375 15.5529 9.49204 15.7496C9.49033 15.9462 9.41145 16.1343 9.2724 16.2734C9.13334 16.4124 8.94523 16.4913 8.74858 16.493C8.55194 16.4947 8.36248 16.4191 8.22103 16.2825L6.49603 14.5575V17.2425C6.49603 17.8392 6.73309 18.4115 7.15504 18.8335C7.577 19.2554 8.1493 19.4925 8.74603 19.4925H11.746C11.9449 19.4925 12.1357 19.5715 12.2764 19.7122C12.417 19.8528 12.496 20.0436 12.496 20.2425C12.496 20.4414 12.417 20.6322 12.2764 20.7728C12.1357 20.9135 11.9449 20.9925 11.746 20.9925H8.74603C7.75147 20.9925 6.79765 20.5974 6.09438 19.8941C5.39112 19.1909 4.99603 18.2371 4.99603 17.2425V14.5575L3.27103 16.2825C3.12958 16.4191 2.94013 16.4947 2.74348 16.493C2.54684 16.4913 2.35873 16.4124 2.21967 16.2734C2.08061 16.1343 2.00174 15.9462 2.00003 15.7496C1.99832 15.5529 2.07392 15.3635 2.21053 15.222L5.21053 12.222C5.28 12.1521 5.36258 12.0965 5.45353 12.0585L5.46403 12.06Z"
							fill="#16C47F"
						/>
					</svg>
				</div>
			),
			cell: (props) => {
				return (
					<button>
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.499 3.75C12.499 3.55109 12.5781 3.36032 12.7187 3.21967C12.8594 3.07902 13.0501 3 13.249 3H16.249C17.2436 3 18.1974 3.39509 18.9007 4.09835C19.6039 4.80161 19.999 5.75544 19.999 6.75V9.435L21.724 7.71C21.8655 7.57338 22.0549 7.49779 22.2516 7.49949C22.4482 7.5012 22.6363 7.58008 22.7754 7.71914C22.9145 7.85819 22.9933 8.0463 22.995 8.24295C22.9967 8.4396 22.9212 8.62905 22.7845 8.7705L19.7845 11.7705C19.6439 11.9111 19.4532 11.9901 19.2543 11.9901C19.0554 11.9901 18.8647 11.9111 18.724 11.7705L15.724 8.7705C15.5874 8.62905 15.5118 8.4396 15.5135 8.24295C15.5152 8.0463 15.5941 7.85819 15.7332 7.71914C15.8722 7.58008 16.0603 7.5012 16.257 7.49949C16.4536 7.49779 16.6431 7.57338 16.7845 7.71L18.5095 9.435V6.75C18.5095 6.15326 18.2725 5.58097 17.8505 5.15901C17.4286 4.73705 16.8563 4.5 16.2595 4.5H13.2595C13.0606 4.5 12.8699 4.42098 12.7292 4.28033C12.5886 4.13968 12.5095 3.94891 12.5095 3.75H12.499ZM5.46403 12.06C5.55347 12.023 5.64924 12.0036 5.74603 12.003H5.75503C5.95252 12.0038 6.14171 12.0825 6.28153 12.222L9.28153 15.222C9.41815 15.3635 9.49375 15.5529 9.49204 15.7496C9.49033 15.9462 9.41145 16.1343 9.2724 16.2734C9.13334 16.4124 8.94523 16.4913 8.74858 16.493C8.55194 16.4947 8.36248 16.4191 8.22103 16.2825L6.49603 14.5575V17.2425C6.49603 17.8392 6.73309 18.4115 7.15504 18.8335C7.577 19.2554 8.1493 19.4925 8.74603 19.4925H11.746C11.9449 19.4925 12.1357 19.5715 12.2764 19.7122C12.417 19.8528 12.496 20.0436 12.496 20.2425C12.496 20.4414 12.417 20.6322 12.2764 20.7728C12.1357 20.9135 11.9449 20.9925 11.746 20.9925H8.74603C7.75147 20.9925 6.79765 20.5974 6.09438 19.8941C5.39112 19.1909 4.99603 18.2371 4.99603 17.2425V14.5575L3.27103 16.2825C3.12958 16.4191 2.94013 16.4947 2.74348 16.493C2.54684 16.4913 2.35873 16.4124 2.21967 16.2734C2.08061 16.1343 2.00174 15.9462 2.00003 15.7496C1.99832 15.5529 2.07392 15.3635 2.21053 15.222L5.21053 12.222C5.28 12.1521 5.36258 12.0965 5.45353 12.0585L5.46403 12.06Z"
								fill="#16C47F"
							/>
						</svg>
					</button>
				);
			},
		},
		{
			accessorKey: "code",
			header: "الكود",
		},
		{
			accessorKey: "itemName",
			header: "اسم الصنف",
		},
		{
			accessorKey: "quantity",
			header: "الكمية",
		},
		// {
		// 	accessorKey: "unit",
		// 	header: "وحدة القياس",
		// },
		{
			accessorKey: "unit",
			header: "وحدة الشراء",
		},
		{
			accessorKey: "total",
			header: "الإجمالي",
		},
		{
			accessorKey: "discount",
			header: "الخصم",
		},
		{
			accessorKey: "tax",
			header: "الضريبة",
			cell: ({ row }) =>
				row.original.tax === "إضافة ضريبة" ? (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<span
								style={{
									color:
										row.original.tax === "إضافة ضريبة" ? "green" : "inherit",
									cursor: "pointer",
									textDecoration: "underline",
								}}
							>
								{row.original.tax}
							</span>
						)}
						DialogContentComponent={() => <TaxOnProduct />}
					/>
				) : (
					<span>{row.original.tax}</span>
				),
		},
		{
			accessorKey: "totalSale",
			header: "إجمالي البيع",
		},
	];
	return (
		<>
			<ReusableManyTable
				dataSets={[
					{
						data: allData,
						columns: Returnscolumns,
						label: "فاتورة مرتجع",
						UserComponent: () => (
							<div className="border-x border-t p-6 flex flex-col gap-5 bg-white">
								<div className="flex justify-between items-center">
									<h1 className="text-[26px] font-[700] text-[#02140D]">
										فاتورة مرتجع
									</h1>
									<h1 className="text-[36px] font-[600] text-[#02140D]">
										S00026
									</h1>
								</div>
								<div className="self-end flex gap-4">
									<CustomPopUp
										DialogTriggerComponent={() => (
											<Button
												className="h-[44px] border-[#16C47F] hover:bg-transparent dark:hover:bg-transparent px-3 py-[10px]"
												variant={"outline"}
											>
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
														fill="#45D099"
													/>
												</svg>

												<p className="font-[500] text-[#16C47F] ">
													ضريبة على الفاتورة
												</p>
											</Button>
										)}
										DialogContentComponent={() => <TaxOnInvoice />}
									/>
									<CustomPopUp
										DialogTriggerComponent={() => (
											<Button
												className="h-[44px] border-[#16C47F] hover:bg-transparent dark:hover:bg-transparent px-3 py-[10px]"
												variant={"outline"}
											>
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
														fill="#45D099"
													/>
												</svg>

												<p className="font-[500] text-[#16C47F] ">
													{" "}
													خصم على الفاتورة
												</p>
											</Button>
										)}
										DialogContentComponent={() => <TaxOnProduct />}
									/>
								</div>
								<div className="flex gap-5">
									<CustomInput
										label="التاريخ"
										type="month"
										wrapperClassName="w-[302px] "
										className="h-[48px]"
									/>

									<CustomSelect
										label="رقم الفاتورة"
										options={["invoice1", "invoice2", "invoice3"]}
										triggerClassName="!h-[48px] w-[302px] bg-white"
										value={selectedInvoice}
										onValueChange={(e) => setSelectedInvoice(e)}
										// className=""
									/>
								</div>
								<div className="flex flex-col gap-1">
									<h1 className="text-[22px] font-[500]">معلومات العميل</h1>
									<div className="flex gap-5 items-center">
										<CustomInput
											label="أسم العميل"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label="الرقم"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label="العنوان"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label="خصومات العميل"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
									</div>
								</div>
							</div>
						),
						FooterComponent: () => <ReturnsTable />,
						containerClassName: "pb-4",
						withPagination: false,
						expandedContent: {
							content: [
								{
									type: "custom",
									Component: <></>,
								},
								{
									type: "custom",
									Component: <></>,
								},

								// { type: "select", options: [] },
								{
									type: "input",
									inputType: "text",
									wrapperClassName: "md:w-[50px]",
								},
								{
									type: "input",
									inputType: "text",
									wrapperClassName: "md:w-[250px]",
								},
								{
									type: "input",
									inputType: "text",
									wrapperClassName: "md:w-[250px]",
								},
								{
									type: "input",
									inputType: "text",
									wrapperClassName: "md:w-[250px]",
								},
								{
									type: "input",
									inputType: "text",
									wrapperClassName: "md:w-[250px]",
								},
								{ type: "select", options: [] },
								{ type: "input", inputType: "text" },
								{ type: "select", options: [] },
							],
							// expandButton: (isExpanded, toggleExpand) => {
							//   return <button>adcacda</button>
							// },
						},
					},
					{
						data: allData,
						columns: Exchangecolumns,
						label: "فاتورة أستبدال",
						UserComponent: () => (
							<div className="border-x border-t p-6 flex flex-col gap-5 bg-white">
								<div className="flex justify-between items-center">
									<h1 className="text-[26px] font-[700] text-[#02140D]">
										فاتورة أستبدال
									</h1>
									<h1 className="text-[36px] font-[600] text-[#02140D]">
										S00026
									</h1>
								</div>
								<div className="self-end flex gap-4">
									<CustomPopUp
										DialogTriggerComponent={() => (
											<Button
												className="h-[44px] border-[#16C47F] hover:bg-transparent dark:hover:bg-transparent px-3 py-[10px]"
												variant={"outline"}
											>
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
														fill="#45D099"
													/>
												</svg>

												<p className="font-[500] text-[#16C47F] ">
													ضريبة على الفاتورة
												</p>
											</Button>
										)}
										DialogContentComponent={() => <TaxOnInvoice />}
									/>
									<CustomPopUp
										DialogTriggerComponent={() => (
											<Button
												className="h-[44px] border-[#16C47F] hover:bg-transparent dark:hover:bg-transparent px-3 py-[10px]"
												variant={"outline"}
											>
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
														fill="#45D099"
													/>
												</svg>

												<p className="font-[500] text-[#16C47F] ">
													{" "}
													خصم على الفاتورة
												</p>
											</Button>
										)}
										DialogContentComponent={() => <TaxOnProduct />}
									/>
								</div>
								<div className="flex gap-5">
									<CustomInput
										label="التاريخ"
										type="month"
										wrapperClassName="w-[302px] "
										className="h-[48px]"
									/>

									<CustomSelect
										label="رقم الفاتورة"
										options={["invoice1", "invoice2", "invoice3"]}
										triggerClassName="!h-[48px] w-[302px] bg-white"
										value={selectedInvoice}
										onValueChange={(e) => setSelectedInvoice(e)}
										// className=""
									/>
								</div>
								<div className="flex flex-col gap-1">
									<h1 className="text-[22px] font-[500]">معلومات العميل</h1>
									<div className="flex gap-5 items-center">
										<CustomInput
											label="أسم العميل"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label="الرقم"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label="العنوان"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label="خصومات العميل"
											type="text"
											wrapperClassName="w-[302px] "
											className="h-[48px]"
										/>
									</div>
								</div>
							</div>
						),
						withFilter: false,
						FooterComponent: () => <ReturnsTable />,
						containerClassName: "pb-4",
						withPagination: false,
					},
				]}
			/>
		</>
	);
}
