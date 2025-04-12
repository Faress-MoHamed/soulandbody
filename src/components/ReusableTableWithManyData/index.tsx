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
import SelectableComponent from "../selectableComponent";

type TableProps<TData> = {
	columns: ColumnDef<TData>[];
	data: TData[];
	title?: string;
	AddTitle?: string;
	onClickAdd?: any;
	ButtonTrigger?: any;
	employees?: any;
	pagination?: any;
	handlePageChange?: any;
	loading?: boolean;
	withFilter?: boolean;
	error?: unknown;
	onDelete?: any;
	deleteLoading?: any;
	onEdit?: any;
	UserComponent?: any;
	withActionButtons?: boolean;
	withColspan?: boolean;
	withPrinter?: boolean;
};
export function Table<TData>({
	columns,
	data,
	title,
	AddTitle,
	onClickAdd,
	ButtonTrigger,
	pagination,
	handlePageChange,
	employees = [],
	loading,
	withColspan,
	error,
	deleteLoading,
	onDelete,
	onEdit,
	withActionButtons = true,
	withFilter = true,
	withPrinter,
	UserComponent,
}: TableProps<TData>) {
	const [selectedEmployee, setSelectedEmployee] = useState<string>("");
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
	const [pageIndex, setPageIndex] = useState(0);

	// Example of filtered data and pagination size
	const filteredData = useMemo(() => {
		return data.filter((record: any) => {
			console.log("selectedEmployee", selectedEmployee);
			console.log("record.employee", record);
			console.log("record.employee", record.employee);
			const matchesEmployee =
				!selectedEmployee || record.employee === selectedEmployee;

			const recordMonth = record.date.split("-").slice(0, 2).join("-"); // Convert "DD/MM/YYYY" → "YYYY-MM"
			// console.log("recordMonth", recordMonth);
			const matchesMonth = !selectedMonth || recordMonth === selectedMonth;
			// console.log("selectedMonth", selectedMonth);

			return matchesEmployee && matchesMonth;
		});
	}, [data, selectedEmployee, selectedMonth]);

	const pageSize = 10;
	const paginatedData = useMemo(() => {
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		return data.slice(start, end);
	}, [data, pageIndex, pageSize]);

	const finalData = useMemo(() => {
		return selectedEmployee ? filteredData : paginatedData;
	}, [selectedEmployee, data, pageIndex, pageSize]);
	const exportToExcel = () => {
		const worksheet = utils.json_to_sheet(data);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, "table_data.xlsx");
	};

	const dynamicColumns = useMemo(() => {
		let updatedColumns: any = [...columns];

		if (selectedEmployee) {
			// Remove "الموظف" (Employee) column
			updatedColumns = updatedColumns.filter(
				(col: any) => col.accessorKey !== "employee"
			);

			// Add "الإجراء" (Action) column
			if (withActionButtons) {
				updatedColumns.push({
					accessorKey: "action",
					header: "الإجراء",
					cell: ({ row }: any) => (
						<div className="flex justify-center gap-1 ">
							<Button
								onClick={() => onDelete(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619]   hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
							>
								{deleteLoading ? (
									<LoadingIndicator />
								) : (
									<>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-trash-2"
										>
											<path d="M3 6h18" />
											<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
											<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
											<line x1="10" x2="10" y1="11" y2="17" />
											<line x1="14" x2="14" y1="11" y2="17" />
										</svg>
										حذف
									</>
								)}
							</Button>
							<Button
								onClick={() => onEdit(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F]   hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-pencil"
								>
									<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
									<path d="m15 5 4 4" />
								</svg>
								تعديل
							</Button>
						</div>
					),
				});
			}
		}

		return updatedColumns;
	}, [selectedEmployee, columns]);

	const table = useReactTable({
		data: finalData,
		columns: dynamicColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		manualPagination: false, // Enable client-side pagination
	});
	return (
		<>
			<Card className="border shadow-none rounded-none">
				{(title || ButtonTrigger || (withFilter && employees.length !== 0)) && (
					<CardHeader className="flex flex-row items-center justify-between">
						{/* Filters */}
						<div className="flex flex-col w-full gap-4">
							{" "}
							{title && (
								<CardTitle className="lg:text-[26px] text-[20px] w-full">
									{title}
								</CardTitle>
							)}
							<div className="flex justify-between md:items-center w-full">
								{withFilter && (
									<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
										<div className="flex flex-col lg:flex-row gap-5">
											<div className="flex flex-col gap-2">
												<label className="text-[16px] text-black font-[500]">
													الموظف
												</label>
												<Select
													value={selectedEmployee}
													dir="rtl"
													onValueChange={(e) => {
														setSelectedEmployee((prev) =>
															prev === e ? "" : e
														);
														setPageIndex(0);
													}}
												>
													<SelectTrigger className="min-w-[240px]">
														<SelectValue placeholder="الكل" />
													</SelectTrigger>
													<SelectContent>
														{loading ? (
															<SelectItem
																className="justify-center"
																disabled
																value="loading"
															>
																<LoadingIndicator />
															</SelectItem>
														) : (
															employees?.map((el: any) => (
																<SelectItem value={el}>{el}</SelectItem>
															))
														)}
													</SelectContent>
												</Select>
											</div>
											<div className="flex flex-col gap-2">
												<label className="text-[16px] text-black font-[500]">
													التاريخ
												</label>
												<Input
													type="month"
													className="min-w-[240px] bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
													value={selectedMonth}
													onChange={(e) => {
														setSelectedMonth((prev) =>
															prev === e.target.value
																? undefined
																: e.target.value
														);
													}}
												/>
											</div>
										</div>
									</div>
								)}
								{ButtonTrigger ? (
									<div className="w-full flex justify-end">
										<ButtonTrigger />
									</div>
								) : (
									<AddButton AddTitle={AddTitle} onClickAdd={onClickAdd} />
								)}
							</div>
						</div>
					</CardHeader>
				)}
				{
					<CardContent>
						{/* Table */}
						{loading ? (
							<LoadingIndicator />
						) : (
							<>
								<div className="overflow-x-auto">
									{withPrinter && (
										<Button
											onClick={exportToExcel}
											className="bg-emerald-500 hover:bg-emerald-600 w-[148px] h-[44px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-none rounded-t-[8px]"
										>
											<img src="/print.svg" className="h-6 w-6 mr-2" />
											{"طباعة"}
										</Button>
									)}{" "}
									{UserComponent && (
										<UserComponent selectedEmployee={selectedEmployee} />
									)}
									<table className="w-full border-collapse">
										<thead className="bg-[#D0F3E5] border-b-[1px] border-[#14250D66]">
											{table.getHeaderGroups().map((headerGroup) => (
												<tr key={headerGroup.id} className="text-center">
													{headerGroup.headers.map((header) => (
														<th
															key={header.id}
															className="p-3 text-center border-b"
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
										{withColspan ? (
											<tbody>
												{table.getRowModel().rows.map((row, index) => {
													const cells = row.getVisibleCells();
													let lastValueIndex = -1;

													// Find the last cell with a value in this row
													for (let i = cells.length - 1; i >= 0; i--) {
														if (cells[i].getValue()) {
															lastValueIndex = i;
															break;
														}
													}

													return (
														<tr
															key={row.id}
															className={cn(
																"border-b hover:bg-muted/50 text-center w-full",
																`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
															)}
														>
															{cells.map((cell, cellIndex) => {
																const cellValue = cell.getValue();

																// Skip rendering cells after the last valued cell
																if (cellIndex > lastValueIndex) return null;

																// Calculate colspan for the last valued cell
																const colspan =
																	cellIndex === lastValueIndex
																		? cells.length - lastValueIndex
																		: undefined;

																return (
																	<td
																		key={cell.id}
																		colSpan={colspan}
																		className={cn(
																			"p-3 text-[16px] tec border-y-[1px] border-[#14250D66]"
																		)}
																	>
																		{flexRender(
																			cell.column.columnDef.cell,
																			cell.getContext()
																		)}
																	</td>
																);
															})}
														</tr>
													);
												})}
											</tbody>
										) : (
											<tbody>
												{table.getRowModel().rows.map((row, index) => (
													<tr
														key={row.id}
														className={cn(
															"border-b hover:bg-muted/50 text-center w-full",
															`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
														)}
													>
														{row.getVisibleCells().map((cell) => (
															<td
																key={cell.id}
																className={cn(
																	`p-3 text-[16px] tec border-y-[1px] border-[#14250D66]`
																)}
															>
																{flexRender(
																	cell.column.columnDef.cell,
																	cell.getContext()
																)}
															</td>
														))}
													</tr>
												))}
											</tbody>
										)}
									</table>
								</div>
								{/* Pagination */}
								{!selectedEmployee && (
									<div className="flex items-start justify-between mt-4 w-full">
										{" "}
										<Button
											variant={"secondary"}
											className="cursor-pointer"
											onClick={() =>
												setPageIndex((prev) =>
													prev + 1 < Math.ceil(filteredData?.length / pageSize)
														? prev + 1
														: prev
												)
											}
											disabled={
												filteredData.length <= pageSize ||
												(pageIndex + 1) * pageSize >= filteredData.length
											}
										>
											<svg
												width="12"
												height="12"
												viewBox="0 0 12 12"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M1.33301 5.99992H10.6663M10.6663 5.99992L5.99967 1.33325M10.6663 5.99992L5.99967 10.6666"
													stroke="#1E1E1E"
													stroke-width="1.6"
													strokeLinecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											التالي
										</Button>
										<div className="flex flex-col items-center justify-center gap-4">
											<div className="flex items-center justify-center">
												{(() => {
													const totalPages =
														Math.ceil(filteredData.length / pageSize) || 1;
													const currentPage = pageIndex + 1;

													const pagesToShow: (number | string)[] = [];

													// Always show first two pages
													pagesToShow.push(1);
													if (totalPages >= 2) pagesToShow.push(2);

													// Determine middle range
													const rangeStart = Math.max(3, currentPage - 1);
													const rangeEnd = Math.min(
														totalPages - 2,
														currentPage + 1
													);

													if (rangeStart > 3) pagesToShow.push("ellipsis1");

													for (let i = rangeStart; i <= rangeEnd; i++) {
														pagesToShow.push(i);
													}

													if (rangeEnd < totalPages - 2)
														pagesToShow.push("ellipsis2");

													// Always show last two pages
													if (totalPages > 3) pagesToShow.push(totalPages - 1);
													if (totalPages > 2) pagesToShow.push(totalPages);

													// Remove duplicates and sort
													const uniquePages = [
														...new Set(pagesToShow.filter(Boolean)),
													].sort((a, b) =>
														typeof a === "number" && typeof b === "number"
															? a - b
															: 0
													);

													return (
														<div className="flex flex-row-reverse items-center gap-1 rtl">
															{uniquePages.map((page, index) => {
																if (
																	typeof page === "string" &&
																	page.startsWith("ellipsis")
																) {
																	return (
																		<span
																			key={`ellipsis-${index}`}
																			className="px-2"
																		>
																			...
																		</span>
																	);
																}

																return (
																	<Button
																		key={page}
																		variant="ghost"
																		className={cn(
																			"w-8 h-8 p-0 min-w-[32px] font-semibold",
																			page === currentPage
																				? "bg-black text-white hover:bg-black hover:text-white "
																				: "text-gray-600"
																		)}
																		onClick={() =>
																			setPageIndex((page as number) - 1)
																		}
																	>
																		{page}
																	</Button>
																);
															})}
														</div>
													);
												})()}
											</div>

											<span>
												الصفحة {pageIndex + 1} من{" "}
												{Math.ceil(filteredData.length / pageSize)}
											</span>
										</div>
										<Button
											variant={"secondary"}
											className="cursor-pointer"
											onClick={() =>
												setPageIndex((prev) => Math.max(prev - 1, 0))
											}
											disabled={
												pageIndex === 0 || filteredData.length <= pageSize
											}
										>
											السابق
											<svg
												width="12"
												height="12"
												viewBox="0 0 12 12"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M10.6663 5.99992H1.33301M1.33301 5.99992L5.99967 10.6666M1.33301 5.99992L5.99967 1.33325"
													stroke="#1E1E1E"
													stroke-width="1.6"
													strokeLinecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</Button>
									</div>
								)}
							</>
						)}
					</CardContent>
				}
			</Card>
		</>
	);
}

type MultipleTableProps<TData> = {
	dataSets: {
		data: TData[];
		title?: string;
		AddTitle?: string;
		employees?: any;
		pagination?: any;
		handlePageChange?: any;
		columns: ColumnDef<TData>[];
		UserComponent?: any;
		onClickAdd?: any;
		ButtonTrigger?: any;
		loading?: boolean;
		withFilter?: boolean;
		error?: unknown;
		onDelete?: any;
		deleteLoading?: any;
		onEdit?: any;
		withActionButtons?: boolean;
		withColspan?: boolean;
	}[];
	withPrinter?: boolean;
};

export default function ReusableManyTable<TData>({
	dataSets,
	withPrinter,
}: MultipleTableProps<TData>) {
	return (
		<div className="flex flex-col gap-8">
			{/* {dataSets.map((set, index) => (
				<Table<TData>
					key={index}
					columns={set.columns}
					data={set.data}
					title={set.title}
					AddTitle={set.AddTitle}
					employees={set.employees}
					pagination={set.pagination}
					handlePageChange={set.handlePageChange}
					onClickAdd={onClickAdd}
					ButtonTrigger={ButtonTrigger}
					loading={loading}
					withColspan={withColspan}
					error={error}
					deleteLoading={deleteLoading}
					onDelete={onDelete}
					onEdit={onEdit}
					withActionButtons={withActionButtons}
					withFilter={withFilter}
					withPrinter={withPrinter}
					UserComponent={UserComponent}
				/>
			))} */}
			<SelectableComponent
				items={dataSets.map((set, index) => ({
					label: set.title || "title",
					component: (
						<Table<TData>
							key={index}
							columns={set.columns}
							data={set.data}
							title={set.title}
							AddTitle={set.AddTitle}
							employees={set.employees}
							pagination={set.pagination}
							handlePageChange={set.handlePageChange}
							onClickAdd={set.onClickAdd}
							ButtonTrigger={set.ButtonTrigger}
							loading={set.loading}
							withColspan={set.withColspan}
							error={set.error}
							deleteLoading={set.deleteLoading}
							onDelete={set.onDelete}
							onEdit={set.onEdit}
							withActionButtons={set.withActionButtons || true}
							withFilter={set.withFilter || true}
							UserComponent={set.UserComponent}
						/>
					),
					data: set.data,
				}))}
				withPrinter={withPrinter}
				exportToExcel={true}
			/>
		</div>
	);
}
