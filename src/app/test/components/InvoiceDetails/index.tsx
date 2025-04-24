"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface InvoiceItem {
	totalInvoice: string;
	totalDiscount: string;
	totalVAT: string;
	totalTableTax: string;
	totalDiscountAndAdditionTax: string;
	netInvoice: string;
	paymentMethod: number;
}

export default function InvoiceDetails() {
	const t = useTranslations("returnsTable");

	const [data, setData] = useState<InvoiceItem[]>([
		{
			totalInvoice: "5454",
			totalDiscount: "15",
			totalVAT: "15",
			totalTableTax: "15",
			totalDiscountAndAdditionTax: "300 ج.م",
			netInvoice: "1850 ج.م",
			paymentMethod: 400,
		},
	]);

	const headers = [
		"اجمالي الفاتورة",
		"العمولة",
		"نسبة ضريبة المبيعات 16%",
		"الأجور",
		"عمالة",
		"رسوم بلدية",
		"اجمالي المصاريف",
		"صافي الفاتورة",
	];

	return (
		<div className="w-full flex flex-col gap-4 px-6 pb-2">
			<Card className="border-none rounded-md">
				<div className="w-full overflow-auto">
					<table className="w-full caption-bottom text-sm border border-[#B9EDD9] rounded-[4px]">
						<thead>
							<tr>
								{headers.map((header, index) => (
									<th
										key={index}
										className={`text-[16px] text-nowrap text-start font-[500] px-3 py-[10px] w-[187px] h-[62px] ${
											index >= 6 ? "bg-[#16C47F]" : "bg-[#00000014]"
										} border-t align-top border-l border-[#B9EDD9]`}
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.length > 0 ? (
								data.map((item, rowIndex) => (
									<tr
										key={rowIndex}
										className="transition-colors hover:bg-muted/50"
									>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{item.totalInvoice}
										</td>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{item.totalDiscount}
										</td>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{item.totalVAT}
										</td>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{item.totalTableTax}
										</td>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{item.totalDiscountAndAdditionTax}
										</td>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{item.netInvoice}
										</td>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{/* Replace with real value if needed */}
											--
										</td>
										<td className="px-3 py-[10px] align-middle text-center text-[16px] border-t border-l border-[#B9EDD9]">
											{item.paymentMethod}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={headers.length} className="h-24 text-center">
										{t("noResults")}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</Card>
			<div className="self-end flex gap-2">
				<Button className="px-3 py-[10px] w-[148px] h-[44px] bg-[#16C47F] hover:bg-[#16C47F]/70">
					حفظ الفاتورة
				</Button>
				<Button
					variant={"outline"}
					className="px-3 py-[10px] w-[148px] h-[44px] border-[#16C47F]"
				>
					الغاء
				</Button>
			</div>
		</div>
	);
}
