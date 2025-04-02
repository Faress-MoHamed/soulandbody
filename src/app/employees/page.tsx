"use client";
import React, { useEffect, useState } from "react";
import ReusableTable from "@/components/ReusableTable";
import WarningPopUp from "@/components/warningPopUp";
import CustomPopUp from "@/components/popups";
import { cn } from "@/lib/utils";
import AddButton from "@/components/AddButton";
import CustomCard from "@/components/customCard";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
	useDeleteEmployee,
	useDistinctEmployees,
	useEmployees,
} from "./useEmployee";
import { useRouter } from "next/navigation";
import Link from "next/link";
const columns = [
	{ accessorKey: "date", header: "التاريخ" },
	{ accessorKey: "employee", header: "الموظف" },
	{ accessorKey: "work_nature", header: "طبيعة العمل" },
	{ accessorKey: "net_salary", header: "صافي المرتب" },
	{ accessorKey: "phone_number", header: "رقم الهاتف" },
	{ accessorKey: "address", header: "العنوان" },
];

// const getRandomDate = (start: any, end: any) => {
// 	const date = new Date(
// 		start.getTime() + Math.random() * (end.getTime() - start.getTime())
// 	);
// 	return date.toISOString().split("T")[0].split("-").reverse().join("/"); // Format: DD/MM/YYYY
// };
// const employees = [
// 	"أحمد محمود",
// 	"محمد علي",
// 	"خالد حسن",
// 	"ياسر عبد الله",
// 	"سعيد عمر",
// ];
// const leaveTypes = ["عادية", "مرضية", "طارئة"];
// const deductions = [100, 120, 150, 200];

// const data = Array.from({ length: 100 }, (_, index) => {
// 	const leaveStart = getRandomDate(
// 		new Date(2025, 9, 10),
// 		new Date(2025, 11, 20)
// 	); // Random date between Oct-Dec 2025
// 	const leaveEnd = getRandomDate(new Date(2025, 9, 11), new Date(2025, 11, 25));

// 	return {
// 		id: index + 1,
// 		date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)), // Random date between Sep-Dec 2025
// 		employee: employees[Math.floor(Math.random() * employees.length)],
// 		leaveStart,
// 		leaveEnd,
// 		leaveDays: Math.max(1, Math.floor(Math.random() * 5)), // 1 to 4 days
// 		leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
// 		deduction: deductions[Math.floor(Math.random() * deductions.length)],
// 	};
// });
export default function Page() {
	const [page, setPage] = useState(1);

	const { data, isLoading, error } = useEmployees(page);

	const handlePageChange = (pageinationPage: number) => {
		setPage(pageinationPage);
	};
	const route = useRouter();
	const { mutate: DeleteEmployee, isPending: DeleteEmployeeLoading } =
		useDeleteEmployee();
	const handleNavigation = (id: string) => {
		route.push(`/employees/${id}`);
	};
	const {
		data: distinctEmployeesName,
		isLoading: distinctEmployeesLoading,
		error: distinctEmployeesError,
	} = useDistinctEmployees();

	return (
		<ReusableTable
			columns={columns}
			data={data?.employees ?? []}
			employees={distinctEmployeesName?.employees?.map(
				(el: any) => el?.employee
			)}
			title="الموظفين"
			loading={isLoading || distinctEmployeesLoading}
			error={error || distinctEmployeesError}
			onDelete={DeleteEmployee}
			deleteLoading={DeleteEmployeeLoading}
			onEdit={handleNavigation}
			ButtonTrigger={() => (
				<Link href={"/employees/add"}>
					<AddButton onClickAdd={() => {}} AddTitle="موظف جديد" />
				</Link>
			)}
			// ButtonTrigger={() => (
			// 	<CustomPopUp
			// 		DialogTriggerComponent={() => {
			// 			return <AddButton onClickAdd={() => {
			// 				route.push("/add")
			// 			}} AddTitle="موظف جديد" />;
			// 		}}
			// 		DialogContentComponent={() => (
			// 			<CustomCard
			// 				title={"اجازات"}
			// 				width={1010}
			// 				height={450}
			// 				className={"md:w-[1010px] w-[300px]"}
			// 				Content={
			// 					<></>
			// 					// <div className="flex flex-col gap-4 lg:pl-6">
			// 					// 	{/* <div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-4">
			// 					// 		<div className="flex flex-col gap-2 w-[302px]">
			// 					// 			<label className="text-[16px] text-black font-[500]">
			// 					// 				الموظف
			// 					// 			</label>
			// 					// 			<Select
			// 					// 				// value={selectedEmployee}
			// 					// 				dir="rtl"
			// 					// 				// onValueChange={(e) => {
			// 					// 				// 	setSelectedEmployee((prev) => (prev === e ? "" : e));
			// 					// 				// }}
			// 					// 			>
			// 					// 				<SelectTrigger className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex ">
			// 					// 					<SelectValue placeholder="الكل" />
			// 					// 				</SelectTrigger>
			// 					// 				<SelectContent>
			// 					// 					{employees?.map((el: any) => (
			// 					// 						<SelectItem value={el}>{el}</SelectItem>
			// 					// 					))}
			// 					// 				</SelectContent>
			// 					// 			</Select>
			// 					// 		</div>
			// 					// 		<div className="flex flex-col gap-1 w-[302px]">
			// 					// 			<label className="text-base text-[#1E1E1E]">
			// 					// 				نوع الأجازة
			// 					// 			</label>
			// 					// 			<Select
			// 					// 				// value={selectedEmployee}
			// 					// 				dir="rtl"
			// 					// 				// onValueChange={(e) => {
			// 					// 				// 	setSelectedEmployee((prev) => (prev === e ? "" : e));
			// 					// 				// }}
			// 					// 			>
			// 					// 				<SelectTrigger className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex ">
			// 					// 					<SelectValue placeholder="الكل" />
			// 					// 				</SelectTrigger>
			// 					// 				<SelectContent>
			// 					// 					{leaveTypes?.map((el: any) => (
			// 					// 						<SelectItem value={el}>{el}</SelectItem>
			// 					// 					))}
			// 					// 				</SelectContent>
			// 					// 			</Select>
			// 					// 		</div>
			// 					// 		<div className="flex flex-col gap-1 w-[302px]">
			// 					// 			<label className="text-base text-[#1E1E1E]">
			// 					// 				عدد الأيام
			// 					// 			</label>
			// 					// 			<Input
			// 					// 				// placeholder="ابحث هنا"
			// 					// 				// className="md:min-w-[302px]  h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"
			// 					// 				className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
			// 					// 				// type="time"

			// 					// 				// value={globalFilter}
			// 					// 				// onChange={(e) => setGlobalFilter(e.target.value)}
			// 					// 			/>
			// 					// 		</div>
			// 					// 		<div className="flex flex-col gap-1 w-[302px]">
			// 					// 			<label htmlFor="fromDate" className="text-right block">
			// 					// 				تاريخ البدء{" "}
			// 					// 			</label>
			// 					// 			<Input
			// 					// 				// placeholder="ابحث هنا"
			// 					// 				// className="md:min-w-[302px]  h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"
			// 					// 				className="md:min-w-[240px] w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
			// 					// 				type="month"

			// 					// 				// value={globalFilter}
			// 					// 				// onChange={(e) => setGlobalFilter(e.target.value)}
			// 					// 			/>
			// 					// 		</div>

			// 					// 		<div className="flex flex-col gap-1 w-[302px]">
			// 					// 			<label htmlFor="toDate" className="text-right block">
			// 					// 				تاريخ العودة{" "}
			// 					// 			</label>
			// 					// 			<Input
			// 					// 				// placeholder="ابحث هنا"
			// 					// 				// className="md:min-w-[240px] w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"
			// 					// 				className="md:min-w-[240px] w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
			// 					// 				type="month"

			// 					// 				// value={globalFilter}
			// 					// 				// onChange={(e) => setGlobalFilter(e.target.value)}
			// 					// 			/>
			// 					// 		</div>
			// 					// 		<div className="flex flex-col gap-1 w-[302px]">
			// 					// 			<label className="text-base text-[#1E1E1E]">خصم</label>
			// 					// 			<Input
			// 					// 				placeholder="خصم"
			// 					// 				className="md:min-w-[240px] w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"

			// 					// 				// value={globalFilter}
			// 					// 				// onChange={(e) => setGlobalFilter(e.target.value)}
			// 					// 			/>
			// 					// 		</div>
			// 					// 	</div> */}
			// 					// 	<div className="pt-7 flex justify-end">
			// 					// 		<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer">
			// 					// 			حفظ
			// 					// 		</Button>
			// 					// 	</div>
			// 					// </div>
			// 				}
			// 			/>
			// 		)}
			// 	/>
			// )}
		/>
	);
}
