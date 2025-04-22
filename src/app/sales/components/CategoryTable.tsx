import React from "react";
import { useTypedTranslation } from "../../hooks/useTypedTranslation";

export default function CategoryTable() {
	const { t } = useTypedTranslation();

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-[#00000014] text-black">
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							{t("sales.categoryTable.category")}
						</th>
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							{t("sales.categoryTable.saleUnit")}
						</th>
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							{t("sales.categoryTable.unitContents")}
						</th>
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							{t("sales.salesInvoices.columns.saleUnit")}
						</th>
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							<div className="flex items-center justify-center">
								<span>{t("sales.categoryTable.subUnitContents")}</span>
								<button className="ms-2 rounded-full p-1">
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
										className="text-black"
									>
										<line x1="12" y1="5" x2="12" y2="19"></line>
										<line x1="5" y1="12" x2="19" y2="12"></line>
									</svg>
								</button>
							</div>
						</th>
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							{t("sales.salesInvoices.columns.saleUnit")}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-white">
						<td className="border border-[#B9EDD9] px-4 py-2 text-center">
							كرتونة
						</td>
						<td className="border border-[#B9EDD9] px-4 py-2 text-center">
							500
						</td>
						<td className="border border-[#B9EDD9] px-4 py-2 text-center">
							50
						</td>
						<td className="border border-[#B9EDD9] px-4 py-2 text-center">
							12
						</td>
						<td className="border border-[#B9EDD9] px-4 py-2 text-center">
							42
						</td>
						<td className="border border-[#B9EDD9] px-4 py-2 text-center">
							10
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
