"use client";
import AddButton from "@/components/AddButton";
import CustomPopUp from "@/components/popups";
import ReusableTable from "@/components/ReusableTable";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AddNewEmployee from "../Employees/component/AddNewEmployee";
import { Button } from "@/components/ui/button";
import AddCustomers from "./components/AddCustomers";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import SearchBar from "@/components/searchBar";
import { useTranslations } from "next-intl";

type Client = {
	name: string;
	phone: string;
	address: string;
	sales: string;
};

function generateClientTableRows(rowCount = 100): Client[] {
	const t = useTranslations("customers");

	// Get translated sample data
	const names = t.raw("sampleNames") as string[];
	const phones = t.raw("samplePhones") as string[];
	const addresses = t.raw("sampleAddresses") as string[];

	const rows: Client[] = [];

	for (let i = 0; i < rowCount; i++) {
		const row = {
			name: names[Math.floor(Math.random() * names.length)],
			phone: phones[Math.floor(Math.random() * phones.length)],
			address: addresses[Math.floor(Math.random() * addresses.length)],
			sales: "5+1",
		};

		rows.push(row);
	}

	return rows;
}

export default function CustomersPage() {
	const t = useTranslations("customers");
	const data = generateClientTableRows(10);

	const columns: ColumnDef<Client>[] = [
		{
			accessorKey: "name",
			header: t("columns.customerName"),
		},
		{
			accessorKey: "phone",
			header: t("columns.phone"),
		},
		{
			accessorKey: "address",
			header: t("columns.address"),
		},
		{
			accessorKey: "sales",
			header: t("columns.discounts"),
		},
		{
			header: t("columns.options"),
			cell: ({ row }) => {
				return (
					<div className="flex justify-center gap-1 ">
						<Button
							// onClick={() => onEdit(row?.original?.id)}
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-70 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-pencil"
							>
								<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
								<path d="m15 5 4 4" />
							</svg>
							{t("buttons.edit")}
						</Button>
						<Button
							// onClick={() => onDelete(row?.original?.id)}
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-70 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
						>
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-trash-2"
								>
									<path d="M3 6h18" />
									<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
									<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
									<line x1="10" x2="10" y1="11" y2="17" />
									<line x1="14" x2="14" y1="11" y2="17" />
								</svg>
								{t("buttons.delete")}
							</>
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					columns,
					data,
					title: t("title"),
					withFilter: false,
					ButtonTrigger: () => (
						<CustomPopUp
							DialogTriggerComponent={() => (
								<div className="text-end flex justify-between">
									<AddButton
										AddTitle={t("addCustomer")}
										onClickAdd={() => {}}
									/>
								</div>
							)}
							DialogContentComponent={() => <AddCustomers />}
						/>
					),
					UserComponent: () => {
						return <SearchBar />;
					},
					withPrinter: true,
					containerClassName: "p-6",
				},
			]}
			// withTopPrinter={false}
		/>
	);
}
