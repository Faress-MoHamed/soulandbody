import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";

export default function InOutPopUp() {
	return (
		<Card className="flex flex-col px-6 py-9 gap-6 w-fit h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					دخول / خروج
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-6 place-items-end">
				{/* <div className='grid-cols-2'> */}
				<p className="place-self-start">
					<span>تاريخ اليوم:</span>
					<span> 1/10/2025</span>
				</p>
				<p className="place-self-end">00:00:00</p>
				<p>
					<span>الوقت المسموح:</span>
					<span> 01:00:00</span>
				</p>

				{/* </div> */}
				{/* <MultiSelect placeholder="الفئة" options={options} /> */}
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[355px] h-[57px] md:mt-8">
					تسجيل خروج
				</Button>
			</CardFooter>
		</Card>
	);
}
