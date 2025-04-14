import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@heroui/react";

export default function RequestVacation() {
  return (
		<Card className="flex flex-col px-6 py-9 gap-6 w-fit h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					طلب الأجازة
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-end w-full ">
					<Button
						className="border border-[#16C47F] px-3 py-2.5 w-[117px] h-[44px] self-end text-[#16C47F] rounded-[8px]"
						variant="bordered"
					>
						السجل
					</Button>
				</div>
				<div className="grid md:grid-cols-3 grid-cols-1 gap-6 place-items-end">
					<CustomInput type="time" label="بداية" />
					<CustomInput type="time" label="نهاية" />
					<CustomInput label="نوع الأجازة" />
				</div>
				<div className="flex md:mt-0 mt-3">
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[148px] h-[48px] md:mt-8">
						ارسال الطلب
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
