import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
export default function PopUp({ onClose }: { onClose: any }) {
	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();

	return (
		<div className="w-[1010px] h-[426px] p-[24px] rounded-[16px] bg-white relative flex flex-col gap-[32px]">
			<Button
				onClick={onClose}
				className="absolute left-[24px] top-[24px] bg-transparent shadow-none hover:bg-transparent cursor-pointer"
			>
				<X size={24} color="black" />
			</Button>
			<div className="text-center w-full text-[20px] font-[500]">
				<h2>استأذان</h2>
			</div>
			<div className=" flex justify-end">
				<Button className="text-[16px] font-[500] text-[#16C47F] border-[#16C47F] p-0 py-[10px] px-3 w-[117px] h-[44px] bg-transparent hover:bg-transparent shadow-none border-[1px]">
					السجل
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-4 pl-6">
				<div className="flex flex-col  gap-1 w-[302px]">
					<label className="text-base text-[#1E1E1E]">الموظف</label>
					<Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
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
			</div>
		</div>
	);
}
