"use client";
import { useState, useMemo, useEffect, type JSX } from "react";
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
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PopUp from "../PopUp";
import AddButton from "../AddButton";
import LoadingIndicator from "../loadingIndicator";
import CustomInput from "../customInput";
import CustomSelect from "../customSelect";
import type { TableProps } from "../ReusableTableWithManyData/table.types";


export default function ReusableTable<TData>({
	columns,
	data,
	title,
	AddTitle,
	onClickAdd,
	ButtonTrigger,
	pagination,
	handlePageChange,
	employees,
	loading,
	withColspan,
	error,
	deleteLoading,
	onDelete,
	onEdit,
	UserComponent,
	FooterComponent,
	containerClassName,
	CardFooterClassName,
	expandableRow = true,
	expandedContent,
	withActionButtons = true,
	withFilter = true,
	withPrinter = true,
	withInlineAdd = false,
	onSaveNewRow,
}: TableProps<TData>) {
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [isAddingRow, setIsAddingRow] = useState(false);
	const [newRowData, setNewRowData] = useState<any>({});
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>();

	// Toggle row expansion
	const toggleRow = (rowId: string) => {
		setExpandedRows((prev) => ({
			...prev,
			[rowId]: !prev[rowId],
		}));
	};

	// Default expand button component
	const defaultExpandButton = (
		isExpanded: boolean,
		toggleExpand: () => void
	) => (
		<button
			onClick={(e) => {
				e.stopPropagation();
				toggleExpand();
			}}
			className="flex items-center justify-center w-6 h-6 rounded-full bg-[#16C47F] text-white hover:bg-[#13B374]"
			aria-label={isExpanded ? "Collapse row" : "Expand row"}
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
				className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
			>
				<path d="M6 9l6 6 6-6" />
			</svg>
		</button>
	);

	// Filter data based on selected employee and month
	const filteredData = useMemo(() => {
		return data.filter((record: any) => {
			const matchesEmployee =
				!selectedEmployee || record.employee === selectedEmployee;
			const recordMonth = record?.date?.split("-")?.slice(0, 2).join("-");
			const matchesMonth = !selectedMonth || recordMonth === selectedMonth;
			return matchesEmployee && matchesMonth;
		});
	}, [selectedEmployee, selectedMonth, data]);

	// Handle input changes for new row
	const handleNewRowInputChange = (key: string, value: any) => {
		setNewRowData((prev: any) => ({
			...prev,
			[key]: value,
		}));
	};

	// Save new row
	const handleSaveNewRow = () => {
		if (onSaveNewRow) {
			onSaveNewRow(newRowData);
			setNewRowData({});
			setIsAddingRow(false);
		}
	};

	// Cancel adding new row
	const cancelAddRow = () => {
		setIsAddingRow(false);
		setNewRowData({});
	};

	// Export to Excel
	const exportToExcel = () => {
		const worksheet = utils.json_to_sheet(data);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, "table_data.xlsx");
	};

	// Dynamic columns configuration
	const dynamicColumns = useMemo(() => {
		let updatedColumns: any = [...columns];

		// Remove employee column if selected
		if (selectedEmployee) {
			updatedColumns = updatedColumns.filter(
				(col: any) => col.accessorKey !== "employee"
			);

			// Add action buttons if enabled
			if (withActionButtons) {
				updatedColumns.push({
					accessorKey: "action",
					header: "الإجراء",
					cell: ({ row }: any) => (
						<div className="flex justify-center gap-1">
							<Button
								onClick={() => onDelete?.(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
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
								onClick={() => onEdit?.(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
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

		// Add expand button column if expandableRow is enabled
		if (expandableRow) {
			updatedColumns.unshift({
				id: "expandButton",
				header: "",
				cell: ({ row }: any) => {
					const isExpanded = expandedRows[row.id] || false;
					const toggleExpand = () => {
						toggleRow(row.id);
						setIsAddingRow((e) => !e);
						console.log(isAddingRow)
					};

					return expandedContent?.expandButton
						? expandedContent.expandButton(isExpanded, toggleExpand)
						: defaultExpandButton(isExpanded, toggleExpand);
				},
			});
		}

		// Add inline add button if enabled
		if (withInlineAdd && !isAddingRow) {
			updatedColumns.unshift({
				id: "addRowButton",
				header: "",
				cell: ({ row, table }: any) => {
					const isLastRow = row.index === table.getRowModel().rows.length - 1;
					if (isLastRow) {
						return (
							<button
								onClick={() => setIsAddingRow(true)}
								className="flex items-center justify-center w-6 h-6 rounded-full bg-[#16C47F] text-white hover:bg-[#13B374]"
								aria-label="Add row"
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
								>
									<path d="M12 5v14M5 12h14" />
								</svg>
							</button>
						);
					}
					return null;
				},
			});
		}

		return updatedColumns;
	}, [
		selectedEmployee,
		columns,
		withInlineAdd,
		isAddingRow,
		onDelete,
		onEdit,
		deleteLoading,
		expandableRow,
		expandedRows,
		expandedContent?.expandButton,
	]);

	// New row component
	const NewRowComponent = () => (
		<tr className="border-b bg-[#F0FFF7] text-center w-full">
			{columns.map((column: any) => (
				<td
					key={column.accessorKey}
					className="p-3 text-center border-y-[1px] border-[#14250D66]"
				>
					{column.accessorKey !== "id" ? (
						<Input
							type="text"
							className="bg-white border-[#D9D9D9] placeholder:text-gray-400 text-right"
							placeholder={`أدخل ${column.header}`}
							value={newRowData[column.accessorKey] || ""}
							onChange={(e) =>
								handleNewRowInputChange(column.accessorKey, e.target.value)
							}
						/>
					) : null}
				</td>
			))}
			{/* <td className="p-3 text-center border-y-[1px] border-[#14250D66]">
				<div className="flex gap-2 justify-center">
					<Button
						onClick={handleSaveNewRow}
						className="bg-[#16C47F] text-white hover:bg-[#13B374]"
					>
						حفظ
					</Button>
					<Button
						onClick={cancelAddRow}
						className="bg-[#C41619] text-white hover:bg-[#A31215]"
					>
						إلغاء
					</Button>
				</div>
			</td> */}
		</tr>
	);

	// Paginated data
	const paginatedData = useMemo(() => {
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		return data.slice(start, end);
	}, [data, pageIndex, pageSize]);

	// Final data to display
	const finalData = useMemo(() => {
		return selectedEmployee ? filteredData : paginatedData;
	}, [selectedEmployee, filteredData, paginatedData]);

	// React Table instance
	const table = useReactTable({
		data: finalData,
		columns: dynamicColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		manualPagination: false,
	});

	const totalRows = selectedEmployee ? filteredData.length : data.length;
	const totalPages = Math.ceil(totalRows / pageSize);

	return (
		<Card className={cn("border-none shadow-none ", containerClassName)}>
			{(title || ButtonTrigger) && (
				<CardHeader className="flex flex-row items-center justify-between">
					<div className="flex w-full gap-4">
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
													setSelectedEmployee((prev) => (prev === e ? "" : e));
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
														prev === e.target.value ? undefined : e.target.value
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

			<CardContent>
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
							)}
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
								<tbody>
									{table.getRowModel().rows.map((row, index) => (
										<>
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
											{expandableRow && expandedRows[row.id] && (
												<tr
													className={cn(
														"border-b hover:bg-muted/50 text-center w-full",
														`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
													)}
												>
													<td colSpan={columns.length + 1}>
														<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
															{expandedContent?.content.map((element, i) => (
																<div key={i} className="mb-4">
																	{(() => {
																		switch (element?.type) {
																			case "input":
																				return (
																					<CustomInput
																						type={element.inputType || "text"}
																						value={element.value}
																						label={element.label}
																						onChange={(e) =>
																							element?.onChange &&
																							element?.onChange(e)
																						}
																						wrapperClassName={
																							element.wrapperClassName
																						}
																						labelClassName={
																							element.labelClassName
																						}
																					/>
																				);
																			case "select":
																				return (
																					<CustomSelect
																						triggerClassName="!h-[48px] w-full bg-white"
																						{...element}
																					/>
																				);
																			case "custom":
																				return element.Component;
																			case "null":
																				return null;
																			default:
																				return null;
																		}
																	})()}
																</div>
															))}
														</div>
													</td>
												</tr>
											)}
										</>
									))}
									{isAddingRow && <NewRowComponent />}
								</tbody>
							</table>
						</div>

						{!selectedEmployee && totalPages > 1 && (
							<div className="flex items-start justify-between mt-4 w-full">
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
											strokeLinejoin="round"
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

											pagesToShow.push(1);
											if (totalPages >= 2) pagesToShow.push(2);

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

											if (totalPages > 3) pagesToShow.push(totalPages - 1);
											if (totalPages > 2) pagesToShow.push(totalPages);

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
								</div>
								<Button
									variant={"secondary"}
									className="cursor-pointer"
									onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
									disabled={pageIndex === 0 || filteredData.length <= pageSize}
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
											strokeLinejoin="round"
										/>
									</svg>
								</Button>
							</div>
						)}
					</>
				)}
			</CardContent>
			{FooterComponent && (
				<CardFooter className={cn(CardFooterClassName)}>
					<FooterComponent />
				</CardFooter>
			)}
		</Card>
	);
}
