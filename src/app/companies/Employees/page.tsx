"use client";
import AddButton from "@/components/AddButton";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomPopUp from "@/components/popups";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AddNewEmployee from "./component/AddNewEmployee";
import SalesRecord from "./component/SalesRecord";
import SearchBar from "@/components/searchBar";
import {
	useEmployeesInvoices,
	type EmployeesInvoicesType,
} from "./hooks/useInvoicesEmployees";
import ShowInvoices from "./component/ShowInvoices";
import { useEmployees, type EmployeesType } from "./hooks/useEmployees";
import { useTranslations } from "next-intl";

export default function EmployeesTable() {
	const t = useTranslations("employeesInvoices");
	const { data: EmployeesInvoicesData, isLoading: EmployeesInvoicesLoading } =
		useEmployeesInvoices();
	const { data: EmployeesData, isLoading: EmployeesLoading } = useEmployees();

	const columns: ColumnDef<EmployeesInvoicesType>[] = [
		{
			accessorKey: "employees",
			header: t("columns.employeeName"),
		},
		{
			accessorKey: "units",
			header: t("columns.unitsCount"),
		},
		// {
		// 	accessorKey: "totalOfUnit",
		// 	header: "اجمالي لوحدة",
		// },
		{
			accessorKey: "totalUnits",
			header: t("columns.totalUnits"),
		},
		{
			accessorKey: "actions",
			header: "", // No header text
			cell: ({ row: { original } }) => {
				return (
					<CustomPopUp
						DialogTriggerComponent={() => {
							return (
								<Button
									variant={"outline"}
									className="w-[84px] h-[32px] p-1 rounded-[8px] text-[#16C47F] hover:text-[#16C47F] border-[#16C47F]"
								>
									{t("buttons.view")}
									<svg
										width="17"
										height="16"
										viewBox="0 0 17 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M15.9698 7.83C15.3817 6.30882 14.3608 4.99331 13.0332 4.04604C11.7056 3.09878 10.1295 2.56129 8.49979 2.5C6.87005 2.56129 5.29398 3.09878 3.96639 4.04604C2.6388 4.99331 1.61787 6.30882 1.02979 7.83C0.990071 7.93985 0.990071 8.06015 1.02979 8.17C1.61787 9.69118 2.6388 11.0067 3.96639 11.954C5.29398 12.9012 6.87005 13.4387 8.49979 13.5C10.1295 13.4387 11.7056 12.9012 13.0332 11.954C14.3608 11.0067 15.3817 9.69118 15.9698 8.17C16.0095 8.06015 16.0095 7.93985 15.9698 7.83ZM8.49979 12.5C5.84979 12.5 3.04979 10.535 2.03479 8C3.04979 5.465 5.84979 3.5 8.49979 3.5C11.1498 3.5 13.9498 5.465 14.9648 8C13.9498 10.535 11.1498 12.5 8.49979 12.5Z"
											fill="#16C47F"
										/>
										<path
											d="M8.5 5C7.90666 5 7.32664 5.17595 6.83329 5.50559C6.33994 5.83524 5.95543 6.30377 5.72836 6.85195C5.5013 7.40013 5.44189 8.00333 5.55765 8.58527C5.6734 9.16721 5.95912 9.70176 6.37868 10.1213C6.79824 10.5409 7.33279 10.8266 7.91473 10.9424C8.49667 11.0581 9.09987 10.9987 9.64805 10.7716C10.1962 10.5446 10.6648 10.1601 10.9944 9.66671C11.3241 9.17336 11.5 8.59334 11.5 8C11.5 7.20435 11.1839 6.44129 10.6213 5.87868C10.0587 5.31607 9.29565 5 8.5 5ZM8.5 10C8.10444 10 7.71776 9.8827 7.38886 9.66294C7.05996 9.44318 6.80362 9.13082 6.65224 8.76537C6.50087 8.39991 6.46126 7.99778 6.53843 7.60982C6.6156 7.22186 6.80608 6.86549 7.08579 6.58579C7.36549 6.30608 7.72186 6.1156 8.10982 6.03843C8.49778 5.96126 8.89992 6.00087 9.26537 6.15224C9.63082 6.30362 9.94318 6.55996 10.1629 6.88886C10.3827 7.21776 10.5 7.60444 10.5 8C10.5 8.53043 10.2893 9.03914 9.91421 9.41421C9.53914 9.78929 9.03043 10 8.5 10Z"
											fill="#16C47F"
										/>
									</svg>
								</Button>
							);
						}}
						DialogContentComponent={() => {
							return <ShowInvoices />;
						}}
					/>
				);
			},
		},
	];

	const EmployeesColumns: ColumnDef<EmployeesType>[] = [
		{
			accessorKey: "name",
			header: t("columns.name"),
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
			accessorKey: "job",
			header: t("columns.job"),
		},
		{
			accessorKey: "permissions",
			header: t("columns.permissions"),
		},
		{
			accessorKey: "options",
			header: t("columns.options"),
			cell: () => (
				<>
					{" "}
					<div className="flex justify-center gap-1 ">
						{" "}
						<CustomPopUp
							DialogTriggerComponent={() => (
								<Button
									className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 rounded-[8px] border border-[#16C47F]"
								>
									<svg
										width="17"
										height="16"
										viewBox="0 0 17 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_2147_3598)">
											<path
												d="M7.83203 2.66665H3.16536C2.81174 2.66665 2.4726 2.80713 2.22256 3.05718C1.97251 3.30723 1.83203 3.64637 1.83203 3.99999V13.3333C1.83203 13.6869 1.97251 14.0261 2.22256 14.2761C2.4726 14.5262 2.81174 14.6667 3.16536 14.6667H12.4987C12.8523 14.6667 13.1915 14.5262 13.4415 14.2761C13.6916 14.0261 13.832 13.6869 13.832 13.3333V8.66666M12.832 1.66665C13.0972 1.40144 13.457 1.25244 13.832 1.25244C14.2071 1.25244 14.5668 1.40144 14.832 1.66665C15.0972 1.93187 15.2462 2.29158 15.2462 2.66665C15.2462 3.04173 15.0972 3.40144 14.832 3.66665L8.4987 9.99999L5.83203 10.6667L6.4987 7.99999L12.832 1.66665Z"
												stroke="#16C47F"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_2147_3598">
												<rect
													width="16"
													height="16"
													fill="white"
													transform="translate(0.5)"
												/>
											</clipPath>
										</defs>
									</svg>
									{t("buttons.salesRecord")}
								</Button>
							)}
							DialogContentComponent={() => <SalesRecord />}
						/>
						<Button
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 rounded-[8px] border border-[#16C47F]"
						>
							<svg
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_2147_3598)">
									<path
										d="M7.83203 2.66665H3.16536C2.81174 2.66665 2.4726 2.80713 2.22256 3.05718C1.97251 3.30723 1.83203 3.64637 1.83203 3.99999V13.3333C1.83203 13.6869 1.97251 14.0261 2.22256 14.2761C2.4726 14.5262 2.81174 14.6667 3.16536 14.6667H12.4987C12.8523 14.6667 13.1915 14.5262 13.4415 14.2761C13.6916 14.0261 13.832 13.6869 13.832 13.3333V8.66666M12.832 1.66665C13.0972 1.40144 13.457 1.25244 13.832 1.25244C14.2071 1.25244 14.5668 1.40144 14.832 1.66665C15.0972 1.93187 15.2462 2.29158 15.2462 2.66665C15.2462 3.04173 15.0972 3.40144 14.832 3.66665L8.4987 9.99999L5.83203 10.6667L6.4987 7.99999L12.832 1.66665Z"
										stroke="#16C47F"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
								<defs>
									<clipPath id="clip0_2147_3598">
										<rect
											width="16"
											height="16"
											fill="white"
											transform="translate(0.5)"
										/>
									</clipPath>
								</defs>
							</svg>
							{t("buttons.edit")}
						</Button>
						<Button
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 rounded-[8px] border border-[#C41619]"
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
				</>
			),
		},
	];

	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: (EmployeesInvoicesData as any) || [],
						loading: EmployeesInvoicesLoading,
						label: t("salesRecord"),
						nestedTable: [
							{
								columns: columns as any,
								data: (EmployeesInvoicesData as any) || [],
								title: "new items",
							},
						],
						UserComponent: () => {
							return (
								<div className="p-6 flex flex-col gap-5 ">
									<h1 className="text-[26px] font-bold">{t("title")}</h1>
									<CustomSelect
										label={t("filters.employee")}
										options={t("employees")
											.split(",")
											.map((emp) => emp.trim())}
										triggerClassName="!h-[48px] md:w-[302px] w-[100%] bg-white"
									/>
									<div className="flex md:flex-row flex-col gap-4 items-end">
										<CustomInput
											label={t("filters.dateFrom")}
											type="date"
											wrapperClassName="md:w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label={t("filters.dateTo")}
											type="date"
											wrapperClassName="md:w-[302px] "
											className="h-[48px]"
										/>
										<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
											{t("buttons.save")}
										</Button>
									</div>
								</div>
							);
						},
						withFilter: false,
					},
					{
						columns: EmployeesColumns as any,
						data: (EmployeesData as any) || [],
						label: t("title"),
						withFilter: false,
						title: t("title"),
						AddTitle: t("addEmployee"),
						containerClassName: "p-6",
						UserComponent: () => {
							return (
								<div className="py-3">
									<SearchBar />
								</div>
							);
						},
						ButtonTrigger: () => {
							return (
								<CustomPopUp
									DialogTriggerComponent={() => (
										<div className="text-end flex justify-between">
											<AddButton
												AddTitle={t("addNewEmployee")}
												onClickAdd={() => {}}
											/>
										</div>
									)}
									DialogContentComponent={() => <AddNewEmployee />}
								/>
							);
						},
					},
				]}
			/>
		</div>
	);
}
