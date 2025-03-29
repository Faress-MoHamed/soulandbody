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
import { cn } from "@/lib/utils";

export default function CustomCard({
	title,
	Content,
	width,
	height,
	className,
	withButton = true,
	ButtonTitle,
}: {
	title?: any;
	Content?: any;
	height?: any;
	width?: any;
	className?: any;
	withButton?: any;
	ButtonTitle?: string;
}) {
	return (
		<Card
			className={cn(
				"flex flex-col   p-4 gap-6 md:w-[923px] h-[325px]",
				`w-[${width}px] h-[${height}px]`,
				className
			)}
		>
			<CardHeader className="flex flex-row items-center justify-between ">
				<CardTitle className="text-center flex-1 text-xl">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{withButton && (
					<div className=" flex justify-end">
						<Button className="text-[16px] font-[500] text-[#16C47F] border-[#16C47F] p-0 py-[10px] px-3 w-[117px] h-[44px] bg-transparent hover:bg-transparent shadow-none border-[1px]">
							{ButtonTitle || "السجل"}
						</Button>
					</div>
				)}
				{Content}
			</CardContent>
		</Card>
	);
}
