import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { cn } from "@/lib/utils";
import { flexRender, type Table } from "@tanstack/react-table";
import React from "react";
import { type JSX } from "react";
import type { SchemaObject } from "../table.types";

export default function ColSpanTbody<TData>({
	table,
	expandableRow,
	expandedRows,
	expandedContent,
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
}) {
	return (
		<div>
			{table.getRowModel().rows.map((row, index) => {
				const cells = row.getVisibleCells();
				let lastValueIndex = -1;

				for (let i = cells.length - 1; i >= 0; i--) {
					if (cells[i].getValue()) {
						lastValueIndex = i;
						break;
					}
				}

				return (
					<>
						<tr
							key={row.id}
							className={cn(
								"border-b hover:bg-muted/50 text-center w-full",
								`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
							)}
						>
							{cells.map((cell, cellIndex) => {
								if (cellIndex > lastValueIndex) return null;
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
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								);
							})}
						</tr>

						{expandableRow && expandedRows[row.id] && (
							<tr
								className={cn(
									"border-b hover:bg-muted/50 text-center w-full space-x-2",
									`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
								)}
							>
								{
									expandedContent?.content
										.map((element, i) => {
											switch (element?.type) {
												case "input":
													return (
														<CustomInput
															key={i}
															type={element.inputType || "text"}
															value={element.value}
															label={element.label}
															onChange={(e) =>
																element?.onChange && element?.onChange(e)
															}
															wrapperClassName={element.wrapperClassName}
															labelClassName={element.labelClassName}
														/>
													);
												case "select":
													return <CustomSelect key={i} {...element} />;
												case "custom":
													return (
														<React.Fragment key={i}>
															{element.Component}
														</React.Fragment>
													);
												case "null":
													return null;
												default:
													return null;
											}
										})
										.filter(Boolean) /* Removes undefined/null */
								}
							</tr>
						)}
					</>
				);
			})}
		</div>
	);
}
