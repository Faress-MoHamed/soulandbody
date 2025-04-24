import React from "react";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function MaxCapacityTable() {
	const { t } = useTypedTranslation();

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-[#ebebeb] text-black">
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							نوع المنتج
						</th>
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							العدد
						</th>
						<th className="border border-[#B9EDD9] px-4 py-2 text-center font-[500] text-[16px]">
							نوع الفئة
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
					</tr>
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
					</tr>
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
					</tr>
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
					</tr>
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
					</tr>
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
					</tr>
				</tbody>
			</table>
		</div>
	);
}
