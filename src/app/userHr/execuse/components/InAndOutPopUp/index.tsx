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

export default function InOutPopUp() {
	const [isOut, setIsOut] = useState(false); // true = counting up
	const [elapsedTime, setElapsedTime] = useState(0); // seconds from 0
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const formatTime = (seconds: number) => {
		const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
		const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
		const s = String(seconds % 60).padStart(2, "0");
		return `${h}:${m}:${s}`;
	};

	useEffect(() => {
		if (isOut) {
			intervalRef.current = setInterval(() => {
				setElapsedTime((prev) => prev + 1);
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
				setElapsedTime(0); // Reset on تسجيل دخول
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isOut]);

	const handleToggle = () => {
		setIsOut((prev) => !prev);
	};

	return (
		<Card className="flex flex-col px-6 py-9 gap-6 w-fit h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					دخول / خروج
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-6 place-items-end">
				<p className="place-self-start">
					<span>تاريخ اليوم:</span>
					<span> {new Date().toLocaleDateString("ar-EG")}</span>
				</p>
				<p className="place-self-end">{formatTime(elapsedTime)}</p>
				<p className="place-self-start">
					<span>الوقت المسموح:</span>
					<span> 01:00:00</span>
				</p>
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button
					onClick={handleToggle}
					className={`${"bg-emerald-500 hover:bg-emerald-600"} text-white px-6 py-2 rounded-md w-[355px] h-[57px] md:mt-8`}
				>
					{isOut ? "تسجيل دخول" : "تسجيل خروج"}
				</Button>
			</CardFooter>
		</Card>
	);
}
