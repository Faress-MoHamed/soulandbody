"use client";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import ReusableTable from "@/components/ReusableTable";
import SmallTable from "@/components/smallTable";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import FinalInvoicesTable from "./components/FinalInvoicesTable";
import CustomPopUp from "@/components/popups";
import TaxOnInvoice from "./components/TaxOnInvoice";
import TaxOnProduct from "./components/TaxOnProduct";

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
			tax: taxOptions[Math.floor(Math.random() * taxOptions.length)].toString(),
			totalSale: (Math.floor(Math.random() * 4000) + 400).toString(),
		});
	}
	return items;
};

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

export default function Page() {
	const [selectedInvoice, setSelectedInvoice] = useState<string>("");
	const allData = generateRandomData(100); // Generate 100 random rows

	// Get data based on selection
	const getData = () => {
		if (!selectedInvoice) {
			return [emptyRow];
		}
		return allData;
	};

	const columns: ColumnDef<(typeof allData)[0]>[] = [
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
		{
			accessorKey: "unit",
			header: "وحدة القياس",
		},
		{
			accessorKey: "saleUnit",
			header: "وحدة البيع",
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
			cell: ({ row }) => (
				<span
					style={{
						color: row.original.tax === "إضافة ضريبة" ? "green" : "inherit",
						cursor: "pointer",
					}}
				>
					{row.original.tax}
				</span>
			),
		},
		{
			accessorKey: "totalSale",
			header: "إجمالي البيع",
		},
	];
	const data = getData();

	return (
		<div className="mt-[40px] flex flex-col gap-9">
			<ReusableTable
				UserComponent={() => (
					<div className="border-x border-t p-6 flex flex-col gap-5 bg-white">
						<div className="flex justify-between items-center">
							<h1 className="text-[26px] font-[700] text-[#02140D]">
								فاتورة بيع
							</h1>
							<h1 className="text-[36px] font-[600] text-[#02140D]">S00026</h1>
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
				)}
				data={data}
				columns={columns}
			/>

			<FinalInvoicesTable />
		</div>
	);
}
