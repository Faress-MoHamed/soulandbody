"use client";

import React, { useState } from "react";
import { useBreakTime, useBreakTimes } from "./useBreakTimes";
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
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";



export default function Page() {
	const { t } = useTypedTranslation();
	const { data: BreakData } = useBreakTimes();

	const columns = [
		{ accessorKey: "date", header: t("breakTime.columns.date") },
		{ accessorKey: "employee", header: t("breakTime.columns.employee") },
		{ accessorKey: "break_start_time", header: t("breakTime.columns.from") },
		{ accessorKey: "break_end_time", header: t("breakTime.columns.to") },
		// { accessorKey: "actual_end", header: t("breakTime.columns.actual_end") },
		{ accessorKey: "deduction", header: t("breakTime.columns.deduction") },
	];


	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: BreakData?.data ?? [],
						title: t("breakTime.title"),
						withActionButtons: false,
						withPrinter: true,
						containerClassName: "border-none",
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
