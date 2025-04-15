"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import CustomPopUp from "@/components/popups";
import CustomInput from "@/components/customInput";

export default function AdditionalTimeRequest() {
	return (
		<Card className="flex flex-col px-6 py-9 gap-6 w-fit h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					الوقت الأضافي
				</CardTitle>
			</CardHeader>
			<CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6 place-items-end">
				<CustomInput type="number" label="عدد الساعات" min={0} max={12} />
				<CustomInput type="number" label="عدد الدقائق" min={0} max={12} />
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center">
				<Button
					className={`${"bg-[#16C47F] hover:bg-emerald-600"} text-white px-6 py-2 rounded-md w-[355px] h-[57px] md:mt-8`}
				>
					ارسال طلب
				</Button>
			</CardFooter>
		</Card>
	);
}
