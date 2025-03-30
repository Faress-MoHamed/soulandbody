"use client";
import React, { useState } from "react";
import { useBreakTime, useBreakTimes } from "./useBreakTimes";
import ReusableTable from "@/components/ReusableTable";
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
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];
function BreakTimeForm() {
	const [formData, setFormData] = useState<Record<any, any>>({
		employee: "",
		from: "",
		actualEnd: "",
	});
	const [errors, setErrors] = useState<Record<any, any>>({});

	const validateForm = () => {
		let newErrors: any = {};
		if (!formData.employee) newErrors.employee = "يرجى اختيار الموظف";
		if (!formData.from) newErrors.from = "يرجى اختيار وقت البداية";
		if (!formData.actualEnd) newErrors.actualEnd = "يرجى اختيار وقت الانتهاء";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Break Form Submitted", formData);
		}
	};

	return (
		<CustomCard
			title="راحة"
			width={1010}
			className={`md:w-[1010px] md:h-[350px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
			Content={
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 md:pl-6">
					<div className="grid md:grid-cols-3 grid-cols-1 items-center gap-4">
						<div className="flex flex-col gap-2 w-[302px]">
							<label>الموظف</label>
							<Select
								dir="rtl"
								value={formData.employee}
								onValueChange={(value) => handleChange("employee", value)}
							>
								<SelectTrigger className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex">
									{" "}
									<SelectValue placeholder="الكل" />
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

						<div className="flex flex-col gap-1 w-[302px]">
							<label>بداية</label>
							<Input
								type="time"
								value={formData.from}
								onChange={(e) => handleChange("from", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right justify-end"
							/>
							{errors.from && (
								<span className="text-red-500">{errors.from}</span>
							)}
						</div>

						<div className="flex flex-col gap-1 w-[302px]">
							<label>وقت الأنتهاء الفعلي</label>
							<Input
								type="time"
								value={formData.actualEnd}
								onChange={(e) => handleChange("actualEnd", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right justify-end"
							/>
							{errors.actualEnd && (
								<span className="text-red-500">{errors.actualEnd}</span>
							)}
						</div>
					</div>

					<div className="pt-7 flex justify-end">
						<Button
							type="submit"
							className="bg-[#16C47F] text-white px-3 w-[148px] h-[48px]"
						>
							حفظ
						</Button>
					</div>
				</form>
			}
		/>
	);
}

export default function page() {
	const { data: BreakData } = useBreakTimes();
	console.log(BreakData);
	const columns = [
		{ accessorKey: "date", header: "التاريخ" },
		{ accessorKey: "employee", header: "الموظف" },
		{ accessorKey: "from", header: "من" },
		{ accessorKey: "to", header: "الي" },
		{ accessorKey: "actual_end", header: "وقت الأنتهاء الفعلي" },
		{ accessorKey: "deduction", header: "الخصم" },
	];
	const distinctEmployees = [
		...new Set(BreakData?.map((el: any) => el?.employee)),
	];

	return (
		<div>
			<ReusableTable
				title="سجل وقت الراحة"
				data={BreakData ?? []}
				columns={columns}
				withActionButtons={false}
				employees={distinctEmployees}
				ButtonTrigger={() => (
					<CustomPopUp
						DialogTriggerComponent={() => {
							return <AddButton onClickAdd={() => {}} AddTitle=" راحة" />;
						}}
						DialogContentComponent={() => <BreakTimeForm />}
					/>
				)}
			/>
		</div>
	);
}
