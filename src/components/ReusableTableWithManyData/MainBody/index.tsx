"use client";
import React, { useState } from "react";
import type { SchemaObject } from "../table.types";
import { flexRender, type Table, type Cell } from "@tanstack/react-table";
import { type JSX } from "react";
import { cn } from "@/lib/utils";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";

export default function MainBody<TData>({
	table,
	expandableRow,
	expandedRows,
	expandedContent,
	onCellClick,
}: {
	table: Table<TData>;
	expandableRow?: boolean;
	expandedContent?: {
		content: SchemaObject[];
		expandButton?: (
			isExpanded: boolean,
			toggleExpand: () => void
		) => JSX.Element;
	};
	expandedRows: Record<string, boolean>;
	onCellClick?: (cell: Cell<TData, unknown>) => JSX.Element | null;
}) {
	const [activeRowId, setActiveRowId] = useState<string | null>(null);
	const [activeCell, setActiveCell] = useState<Cell<TData, unknown> | null>(
		null
	);
	return (
		<>
			{table.getRowModel().rows.map((row, rowIndex) => {
				const rowCells = row.getVisibleCells();

				return (
					<React.Fragment key={row.id}>
						<tr
							className={cn(
								"border-b hover:bg-[#98cbb7] transition-colors duration-300 text-center w-full",
								`${rowIndex % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
							)}
						>
							{rowCells.map((cell) => (
								<td
									key={cell.id}
									onClick={() => {
										if (onCellClick) {
											const content = onCellClick(cell);
											if (content) {
												setActiveRowId((prev) =>
													prev === row.id ? null : row.id
												);
												setActiveCell((prev) =>
													prev?.id === cell.id ? null : cell
												);
											}
										}
									}}
									className={cn(
										"relative p-3 text-[16px] tec border-y-[1px] border-[#14250D66] text-nowrap"
									)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>

						{/* Conditional extra row on click */}
						{activeRowId === row.id && activeCell && (
							<tr
								className={cn(
									"bg-white border-b text-center w-full",
									`${rowIndex % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
								)}
							>
								<td colSpan={rowCells.length}>{onCellClick?.(activeCell)}</td>
							</tr>
						)}

						{/* Expanded content row (if any) */}
						{expandableRow && expandedRows[row.id] && (
							<tr
								className={cn(
									"border-b hover:bg-muted/50 text-center w-full",
									`${rowIndex % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
								)}
							>
								{expandedContent?.content.map((element, i) => (
									<td
										key={i}
										className="p-3 text-[16px] border-y-[1px] border-[#14250D66] max-w-[120px]"
									>
										{(() => {
											switch (element?.type) {
												case "input":
													return (
														<CustomInput
															type={element.inputType || "text"}
															value={element.value}
															label={element.label}
															onChange={(e) =>
																element?.onChange && element?.onChange(e)
															}
															className="max-w-[240px] min-w-auto"
															wrapperClassName={cn(
																"md:w-auto md:max-w-full",
																element.wrapperClassName
															)}
															labelClassName={cn(element.labelClassName)}
														/>
													);
												case "select":
													return (
														<CustomSelect
															triggerClassName="!h-[48px] w-[302px] bg-white"
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
									</td>
								))}
							</tr>
						)}
					</React.Fragment>
				);
			})}
		</>
	);
}
