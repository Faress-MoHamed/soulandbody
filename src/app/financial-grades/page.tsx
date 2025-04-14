"use client";
import React, { useEffect, useState } from "react";
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
} from "../employees/useEmployee";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SelectableComponent from "@/components/selectableComponent";
import { useDeductions } from "./useDeductions";
import { useSalaries } from "./useSalaries";
import ReusableTable from "@/components/ReusableTable";

const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];
const leaveTypes = ["عادية", "مرضية", "طارئة"];

type FormDataType = {
	employee: string;
	leaveType: string;
	leaveDays: string;
	leaveStart: string;
	leaveEnd: string;
	deduction: string;
};
type SalaryFormType = {
	employee: string;
	date: string;
	netSalary: string;
	extras: string;
	allowances: string;
	totalSalary: string;
};
interface DeductionFormType {
	date: string;
	employee: string;
	type: string;
	amount: string;
	reason: string;
}
const LeaveForm = () => {
	const [formData, setFormData] = useState<DeductionFormType>({
		date: "",
		employee: "",
		type: "",
		amount: "",
		reason: "",
	});
	const [errors, setErrors] = useState<Partial<DeductionFormType>>({});

	const validateForm = () => {
		let newErrors: Partial<DeductionFormType> = {};

		if (!formData.date) newErrors.date = "يرجى اختيار التاريخ";
		if (!formData.employee) newErrors.employee = "يرجى اختيار الموظف";
		if (!formData.type) newErrors.type = "يرجى اختيار نوع الحركة";
		if (
			!formData.amount ||
			isNaN(Number(formData.amount)) ||
			Number(formData.amount) <= 0
		)
			newErrors.amount = "يرجى إدخال مبلغ صحيح";
		if (!formData.reason) newErrors.reason = "يرجى إدخال السبب";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form submitted", formData);
			// Handle submit
		}
	};

	const handleChange = (field: keyof DeductionFormType, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<CustomCard
			title="الحركات المالية لشئون الموظفين"
			width={1010}
			height={400}
			className={`lg:w-[1010px] lg:h-[350px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
			// className="lg:w-[1010px] w-[350px] md:h-auto overflow-auto md:min-h-[350px] h-[30%]"
			Content={
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="grid lg:grid-cols-3 gap-4">
						{" "}
						{/* Employee */}
						<div>
							<label>الموظف</label>
							<Select
								dir="rtl"
								value={formData.employee}
								onValueChange={(val) => handleChange("employee", val)}
							>
								<SelectTrigger className="md:min-w-[200px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex  w-full ">
									{" "}
									<SelectValue placeholder="اختر الموظف" />
								</SelectTrigger>
								<SelectContent>
									{employees.map((emp) => (
										<SelectItem key={emp} value={emp}>
											{emp}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.employee && (
								<span className="text-red-500">{errors.employee}</span>
							)}
						</div>
						{/* Date */}
						<div>
							<label>التاريخ</label>
							<Input
								className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
								type="date"
								value={formData.date}
								onChange={(e) => handleChange("date", e.target.value)}
								// className="form-input"
							/>
							{errors.date && (
								<span className="text-red-500">{errors.date}</span>
							)}
						</div>
						{/* Type */}
						<div>
							<label>نوع الحركة</label>
							<Select
								dir="rtl"
								value={formData.type}
								onValueChange={(val) => handleChange("type", val)}
							>
								<SelectTrigger className="md:min-w-[200px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex  w-full ">
									{" "}
									<SelectValue placeholder="اختر النوع" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="خصم">خصم</SelectItem>
									<SelectItem value="سلفة">سلفة</SelectItem>
								</SelectContent>
							</Select>
							{errors.type && (
								<span className="text-red-500">{errors.type}</span>
							)}
						</div>
						{/* Amount */}
						<div>
							<label>المبلغ</label>
							<Input
								className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
								type="number"
								value={formData.amount}
								onChange={(e) => handleChange("amount", e.target.value)}
							/>
							{errors.amount && (
								<span className="text-red-500">{errors.amount}</span>
							)}
						</div>
						{/* Reason */}
						<div>
							<label>السبب</label>
							<Input
								className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
								type="text"
								value={formData.reason}
								onChange={(e) => handleChange("reason", e.target.value)}
							/>
							{errors.reason && (
								<span className="text-red-500">{errors.reason}</span>
							)}
						</div>
						<div className="pt-6 flex ">
							<Button
								type="submit"
								className="text-white bg-[#16C47F] p-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none"
							>
								حفظ
							</Button>
						</div>
					</div>
				</form>
			}
		/>
	);
};

function SalariesForm() {
	const [formData, setFormData] = useState<SalaryFormType>({
		employee: "",
		date: "",
		netSalary: "",
		extras: "",
		allowances: "",
		totalSalary: "",
	});
	const [errors, setErrors] = useState<Partial<SalaryFormType>>({});

	const validateForm = (): boolean => {
		let newErrors: Partial<SalaryFormType> = {};

		if (!formData.employee) newErrors.employee = "يرجى اختيار الموظف";
		if (!formData.date) newErrors.date = "يرجى اختيار التاريخ";
		if (
			!formData.netSalary ||
			isNaN(Number(formData.netSalary)) ||
			Number(formData.netSalary) < 0
		)
			newErrors.netSalary = "يرجى إدخال صافي راتب صالح";
		if (
			!formData.extras ||
			isNaN(Number(formData.extras)) ||
			Number(formData.extras) < 0
		)
			newErrors.extras = "يرجى إدخال قيمة زيادات صالحة";
		if (
			!formData.allowances ||
			isNaN(Number(formData.allowances)) ||
			Number(formData.allowances) < 0
		)
			newErrors.allowances = "يرجى إدخال قيمة بدلات صالحة";
		if (
			!formData.totalSalary ||
			isNaN(Number(formData.totalSalary)) ||
			Number(formData.totalSalary) < 0
		)
			newErrors.totalSalary = "يرجى إدخال إجمالي راتب صالح";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field: keyof SalaryFormType, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Salary Form Submitted", formData);
			// Handle salary submission logic here
		}
	};

	return (
		<CustomCard
			title="رواتب موظفين"
			ButtonTitle="ارسال الرواتب"
			className={`lg:w-[1010px] lg:h-[450px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
			Content={
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:pl-6">
					<div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-4">
						{/* Employee Select */}
						<div className="flex flex-col gap-2 w-[200px]">
							<label>الموظف</label>
							<Select
								dir="rtl"
								value={formData.employee}
								onValueChange={(value) => handleChange("employee", value)}
							>
								<SelectTrigger className="md:min-w-[200px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex">
									<SelectValue placeholder="اختر الموظف" />
								</SelectTrigger>
								<SelectContent>
									{employees.map((el) => (
										<SelectItem key={el} value={el}>
											{el}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.employee && (
								<span className="text-red-500">{errors.employee}</span>
							)}
						</div>

						{/* Date Input */}
						<div className="flex flex-col gap-1 min-w-[200px] w-full">
							<label>التاريخ</label>
							<Input
								type="date"
								value={formData.date}
								onChange={(e) => handleChange("date", e.target.value)}
								className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
							/>
							{errors.date && (
								<span className="text-red-500">{errors.date}</span>
							)}
						</div>

						{/* Salary Inputs */}
						{[
							{ label: "صافي المرتب", field: "netSalary" },
							{ label: "زيادات", field: "extras" },
							{ label: "بدلات", field: "allowances" },
							{ label: "اجمالي المرتب", field: "totalSalary" },
						].map(({ label, field }) => (
							<div
								key={field}
								className="flex flex-col gap-1 min-w-[200px] w-full"
							>
								<label>{label}</label>
								<Input
									type="number"
									value={formData[field as keyof SalaryFormType]}
									onChange={(e) =>
										handleChange(field as keyof SalaryFormType, e.target.value)
									}
									className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
								/>
								{errors[field as keyof SalaryFormType] && (
									<span className="text-red-500">
										{errors[field as keyof SalaryFormType]}
									</span>
								)}
							</div>
						))}
					</div>

					{/* Submit Button */}
					<div className="pt-7 flex justify-end">
						<Button
							type="submit"
							className="text-white bg-[#16C47F] p-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none"
						>
							حفظ
						</Button>
					</div>
				</form>
			}
		/>
	);
}

function Deduction() {
	const {
		data: deductionData,
		isLoading: deductionLoading,
		error: deductionError,
	} = useDeductions();
	const columns = [
		{ accessorKey: "date", header: "التاريخ" },
		{ accessorKey: "employee", header: "الموظف" },
		{ accessorKey: "type", header: "نوع الحركة" },
		{ accessorKey: "amount", header: "المبلغ" },
		{ accessorKey: "reason", header: "السبب" },
	];
	const distinctEmployees = [
		...new Set(deductionData?.map((el: any) => el?.employee)),
	];

	return (
		<>
			<ReusableTable
				columns={columns}
				data={deductionData ?? []}
				employees={distinctEmployees}
				withActionButtons={false}
				loading={deductionLoading}
				// error={deductionError}
				ButtonTrigger={() => (
					<CustomPopUp
						DialogTriggerComponent={() => {
							return (
								<AddButton
									onClickAdd={() => {}}
									AddTitle=" حركة حسابية جديدة"
								/>
							);
						}}
						DialogContentComponent={() => <LeaveForm />}
					/>
				)}
			/>
		</>
	);
}
function Salaries() {
	const { data: salaryData, isLoading: salaryLoading } = useSalaries();

	const columns = [
		{ accessorKey: "date", header: "التاريخ" },
		{ accessorKey: "employee", header: "الموظف" },
		{ accessorKey: "salary", header: "الراتب" },
		{ accessorKey: "net_salary", header: "صافي المرتب" },
		{ accessorKey: "extras", header: "زيادات" },
		{ accessorKey: "allowances", header: "بدلات" },
	];
	const distinctEmployees = [
		...new Set(salaryData?.map((el: any) => el?.employee)),
	];

	return (
		<ReusableTable
			columns={columns}
			data={salaryData ?? []}
			employees={distinctEmployees}
			withActionButtons={false}
			// title="الموظفين"
			loading={salaryLoading}
			ButtonTrigger={() => (
				<CustomPopUp
					DialogTriggerComponent={() => {
						return <AddButton onClickAdd={() => {}} AddTitle="اضافة راتب" />;
					}}
					DialogContentComponent={() => <SalariesForm />}
				/>
			)}
		/>
	);
}

export default function Page() {
	return (
		<>
			<h2 className="text-[26px] font-bold">سجل الحركات</h2>
			<SelectableComponent
				contentClassName="border-2 p-6 mt-0 "
				items={[
					{ label: "خصم واضافة", component: <Deduction /> },
					{ label: "مرتبات", component: <Salaries /> },
				]}
			/>
		</>
	);
}
