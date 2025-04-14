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
import SearchBar from "@/components/searchInput";

export default function EmployeesTable() {
	const generateRandomEmployeeData = (count: number) => {
		const items = [];
		const itemNames = ["فارس", "محمد", "احمد", "علي"];

		for (let i = 0; i < count; i++) {
			items.push({
				employees: itemNames[Math.floor(Math.random() * itemNames.length)],
				units: (Math.floor(Math.random() * 10) + 1).toString(),
				totalOfUnit: (Math.floor(Math.random() * 5) + 1).toString(),
				totalUnits: (Math.floor(Math.random() * 1000) + 100).toString(),
			});
		}
		return items;
	};
	const data = generateRandomEmployeeData(100);
	const columns: ColumnDef<(typeof data)[0]>[] = [
		{
			accessorKey: "employees",
			header: "أسم الموظف",
		},
		{
			accessorKey: "units",
			header: "عدد الوحدات",
		},
		{
			accessorKey: "totalOfUnit",
			header: "اجمالي لوحدة",
		},
		{
			accessorKey: "totalUnits",
			header: "اجمالي الوحدات",
		},
	];

	const EmployeesData = Array.from({ length: 100 }, (_, i) => ({
		name: `الموظف رقم ${i + 1}`,
		phone: `05${Math.floor(100000000 + Math.random() * 900000000)}`,
		address: `عنوان ${i + 1}`,
		job: ["مدير", "محاسب", "مبرمج", "مسوق", "مصمم"][i % 5],
		permissions: ["عرض", "تعديل", "حذف", "إضافة"][i % 4],
		options: "خيارات",
	}));

	const EmployeesColumns: ColumnDef<{
		name?: string;
		phone?: string;
		address?: string;
		job?: string;
		permissions?: string;
		options?: string;
	}>[] = [
		{
			accessorKey: "name",
			header: "اسم الموظف",
		},
		{
			accessorKey: "phone",
			header: "رقم الهاتف",
		},
		{
			accessorKey: "address",
			header: "العنوان",
		},
		{
			accessorKey: "job",
			header: "المهنة",
		},
		{
			accessorKey: "permissions",
			header: "صلاحيات",
		},
		{
			accessorKey: "options",
			header: "خيارات",
			cell: () => (
				<>
					{" "}
					<div className="flex justify-center gap-1 ">
						{" "}
						<CustomPopUp
							DialogTriggerComponent={() => (
								<Button
									// onClick={() => onEdit(row?.original?.id)}
									className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F]   hover:bg-white hover:opacity-85  rounded-[8px] border border-[#16C47F]"
								>
									<svg
										width="17"
										height="16"
										viewBox="0 0 17 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clip-path="url(#clip0_2147_3598)">
											<path
												d="M7.83203 2.66665H3.16536C2.81174 2.66665 2.4726 2.80713 2.22256 3.05718C1.97251 3.30723 1.83203 3.64637 1.83203 3.99999V13.3333C1.83203 13.6869 1.97251 14.0261 2.22256 14.2761C2.4726 14.5262 2.81174 14.6667 3.16536 14.6667H12.4987C12.8523 14.6667 13.1915 14.5262 13.4415 14.2761C13.6916 14.0261 13.832 13.6869 13.832 13.3333V8.66666M12.832 1.66665C13.0972 1.40144 13.457 1.25244 13.832 1.25244C14.2071 1.25244 14.5668 1.40144 14.832 1.66665C15.0972 1.93187 15.2462 2.29158 15.2462 2.66665C15.2462 3.04173 15.0972 3.40144 14.832 3.66665L8.4987 9.99999L5.83203 10.6667L6.4987 7.99999L12.832 1.66665Z"
												stroke="#16C47F"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
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
									سجل البيع
								</Button>
							)}
							DialogContentComponent={() => <SalesRecord />}
						/>
						<Button
							// onClick={() => onEdit(row?.original?.id)}
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F]   hover:bg-white hover:opacity-85  rounded-[8px] border border-[#16C47F]"
						>
							<svg
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_2147_3598)">
									<path
										d="M7.83203 2.66665H3.16536C2.81174 2.66665 2.4726 2.80713 2.22256 3.05718C1.97251 3.30723 1.83203 3.64637 1.83203 3.99999V13.3333C1.83203 13.6869 1.97251 14.0261 2.22256 14.2761C2.4726 14.5262 2.81174 14.6667 3.16536 14.6667H12.4987C12.8523 14.6667 13.1915 14.5262 13.4415 14.2761C13.6916 14.0261 13.832 13.6869 13.832 13.3333V8.66666M12.832 1.66665C13.0972 1.40144 13.457 1.25244 13.832 1.25244C14.2071 1.25244 14.5668 1.40144 14.832 1.66665C15.0972 1.93187 15.2462 2.29158 15.2462 2.66665C15.2462 3.04173 15.0972 3.40144 14.832 3.66665L8.4987 9.99999L5.83203 10.6667L6.4987 7.99999L12.832 1.66665Z"
										stroke="#16C47F"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
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
							تعديل
						</Button>
						<Button
							// onClick={() => onDelete(row?.original?.id)}
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619]   hover:bg-white hover:opacity-85  rounded-[8px] border border-[#C41619]"
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
								حذف
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
						data,
						label: "سجل المبيعات",
						UserComponent: () => {
							return (
								<div className="p-6 flex flex-col gap-5 ">
									<h1 className="text-[26px] font-bold">الموظفين</h1>
									<CustomSelect
										label="الموظف"
										options={["فارس", "محمد", "احمد", "علي"]}
										triggerClassName="!h-[48px] md:w-[302px] w-[100%] bg-white"
									/>
									<div className="flex md:flex-row flex-col gap-4 items-end">
										<CustomInput
											label="من فترة"
											type="date"
											wrapperClassName="md:w-[302px] "
											className="h-[48px]"
										/>
										<CustomInput
											label="الي فترة"
											type="date"
											wrapperClassName="md:w-[302px] "
											className="h-[48px]"
										/>
										<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
											حفظ
										</Button>
									</div>
								</div>
							);
						},
						withFilter: false,
					},
					{
						columns: EmployeesColumns as any,
						data: EmployeesData as any,
						label: "الموظفين",
						withFilter: false,
						title: "الموظفين",
						AddTitle: "اضافة موظف ",
						UserComponent: () => {
							return (
								<div className="flex md:flex-row flex-col justify-between gap-4 md:items-center px-5 md:py-0 py-5">
									<SearchBar />
									<CustomPopUp
										DialogTriggerComponent={() => (
											<div className="text-end flex justify-between">
												<AddButton
													AddTitle="اضافة موظف "
													onClickAdd={() => {}}
												/>
											</div>
										)}
										DialogContentComponent={() => <AddNewEmployee />}
									/>
								</div>
							);
						},
						// ButtonTrigger: () => {
						// 	return (
						// 		<CustomPopUp
						// 			DialogTriggerComponent={() => (
						// 				<div className="my-3">
						// 					<AddButton
						// 						AddTitle="اضافة موظف  جديد "
						// 						onClickAdd={() => {}}
						// 					/>
						// 				</div>
						// 			)}
						// 			DialogContentComponent={() => <AddNewEmployee />}
						// 		/>
						// 	);
						// },
					},
				]}
			/>
		</div>
	);
}
