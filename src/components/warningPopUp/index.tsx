"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";

export default function WarningPopUp() {
	const [warningType, setWarningType] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted");
	};

	return (
		<Card className="flex flex-col   bg-white p-4 gap-6 lg:w-[923px] w-[300px] lg:h-[325px] h-fit">
			<CardHeader className="flex flex-row items-center justify-between ">
				<CardTitle className="text-center flex-1 text-xl">
					إجراءات تأديبية
				</CardTitle>
			</CardHeader>
			{/* <div className=" flex justify-end">
				<Button className="text-[16px] font-[500] text-[#16C47F] border-[#16C47F] p-0 py-[10px] px-3 w-[117px] h-[44px] bg-transparent hover:bg-transparent shadow-none border-[1px]">
					السجل
				</Button>
			</div> */}
			{/* <div className="flex flex-wrap items-center gap-4 pl-6">
				<div className="flex flex-col  gap-1 w-[302px]">
					<label className="text-base text-[#1E1E1E]">الموظف</label>
					<Select>
						<SelectTrigger className="min-w-[240px] w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex ">
							<SelectValue placeholder="الكل" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Ahmed Mahmoud">أحمد محمود</SelectItem>
							<SelectItem value="Mohamed Ali">محمد علي</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-col gap-1 w-[302px]">
					<label className="text-base text-[#1E1E1E]">بداية</label>
					<Input
						// placeholder="الأن 20:00 ص"
						className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
						type="time"
						// value={globalFilter}
						// onChange={(e) => setGlobalFilter(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1 w-[302px]">
					<label className="text-base text-[#1E1E1E]">نهاية</label>
					<Input
						// placeholder="ابحث هنا"
						// className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"
						className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
						type="time"

						// value={globalFilter}
						// onChange={(e) => setGlobalFilter(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1 w-[302px]">
					<label className="text-base text-[#1E1E1E]">السبب</label>
					<Input
						placeholder="تأخير"
						className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"

						// value={globalFilter}
						// onChange={(e) => setGlobalFilter(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-1 w-[302px]">
					<label className="text-base text-[#1E1E1E]">
						وقت الأنتهاء الفعلي
					</label>
					<Input
						// placeholder="ابحث هنا"
						// className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"
						className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
						type="time"

						// value={globalFilter}
						// onChange={(e) => setGlobalFilter(e.target.value)}
					/>
				</div>
				<div className="pt-7">
					<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer">
						حفظ
					</Button>
				</div>
			</div> */}
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className="space-y-4 flex lg:flex-row flex-col items-end gap-2"
					// dir="rtl"
				>
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
						<div className="space-y-2">
							<label htmlFor="employeeName" className="text-right block">
								اسم الموظف
							</label>
							<Select>
								<SelectTrigger
									dir="rtl"
									className="min-w-[240px] w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex "
								>
									<SelectValue placeholder="احمد محمود" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ahmed">احمد محمود</SelectItem>
									<SelectItem value="mohamed">محمد احمد</SelectItem>
									<SelectItem value="ali">علي حسن</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<label htmlFor="warningType" className="text-right block">
								نوع الإنذار
							</label>
							<Select onValueChange={setWarningType}>
								<SelectTrigger
									dir="rtl"
									className="min-w-[240px] w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex "
								>
									<SelectValue placeholder="تنبيه" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="warning">تنبيه</SelectItem>
									<SelectItem value="suspension">إيقاف عن العمل</SelectItem>
									<SelectItem value="termination">إنهاء خدمة</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{warningType === "suspension" && (
							<>
								<div className="space-y-2">
									<label htmlFor="fromDate" className="text-right block">
										من تاريخ
									</label>
									<Input
										// placeholder="ابحث هنا"
										// className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"
										className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
										type="month"

										// value={globalFilter}
										// onChange={(e) => setGlobalFilter(e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="toDate" className="text-right block">
										إلى تاريخ
									</label>
									<Input
										// placeholder="ابحث هنا"
										// className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black"
										className="min-w-[240px] h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
										type="month"

										// value={globalFilter}
										// onChange={(e) => setGlobalFilter(e.target.value)}
									/>
								</div>
							</>
						)}
					</div>
					<div
						className={warningType === "suspension" ? "pb-[16px]" : "pb-[24px]"}
					>
						<Button
							type="submit"
							className="bg-emerald-500 hover:bg-emerald-600 p-0 py-[10px] px-3 w-[117px] h-[44px]  shadow-none border-[1px]"
						>
							حفظ
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
