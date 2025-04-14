import React from 'react'
import type { SchemaObject } from '../table.types';
import { flexRender, type Table } from '@tanstack/react-table';
import { type JSX } from "react";
import { cn } from '@/lib/utils';
import CustomInput from '@/components/customInput';
import CustomSelect from '@/components/customSelect';

export default function MainBody<TData>({
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
		<>
			{table.getRowModel().rows.map((row, index) => {
				return (
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
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
																"md:w-auto md:max-w-[302px]",
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
					</>
				);
			})}
		</>
	);
}
