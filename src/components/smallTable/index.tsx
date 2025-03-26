"use client";
import { useState, useMemo, useEffect } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
	ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PopUp from "../PopUp";
import AddButton from "../AddButton";
import LoadingIndicator from "../loadingIndicator";

type TableProps<TData> = {
	columns: ColumnDef<TData>[];
	data: TData[];
	title: string;
	AddTitle?: string;
	onClickAdd?: any;
	ButtonTrigger?: any;
	loading?: boolean;
};

export default function SmallTable<TData>({
	columns,
	data,
	title,
	AddTitle,
	onClickAdd,
	ButtonTrigger,
	loading,
}: TableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
	});

	return (
		<>
			<Card className="border-none shadow-none ">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-[26px]">{title}</CardTitle>
					{ButtonTrigger ? (
						<ButtonTrigger />
					) : (
						<AddButton AddTitle={AddTitle} onClickAdd={onClickAdd} />
					)}
				</CardHeader>
				{
					<CardContent>
						{/* Table */}
						{loading ? (
							<LoadingIndicator />
						) : (
							<>
								<div className="overflow-x-auto rounded-[8px] border-[1px] border-[#16C47F] ">
									<table className="w-full border-collapse ">
										<thead className="bg-[#E8F9F2] ">
											{table.getHeaderGroups().map((headerGroup) => (
												<tr key={headerGroup.id} className="text-center">
													{headerGroup.headers.map((header) => (
														<th
															key={header.id}
															className="p-3 text-center color-[#003861]"
														>
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
														</th>
													))}
												</tr>
											))}
										</thead>
										<tbody>
											{table.getRowModel().rows.map((row) => (
												<tr
													key={row.id}
													className=" hover:bg-muted/50 text-center"
												>
													{row.getVisibleCells().map((cell) => (
														<td
															key={cell.id}
															className={cn(
																`p-3 text-[16px] tec border-x-[1px] border-t border-[#16C47F]`,
																
															)}
														>
															{" "}
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext()
															)}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</>
						)}
					</CardContent>
				}
			</Card>
		</>
	);
}
