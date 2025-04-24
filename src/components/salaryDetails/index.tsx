"use client";

import { useTranslations } from "next-intl";

export default function SalaryDetailsTable() {
	const t = useTranslations("salaryDetails");

	return (
		<>
			<th className="flex justify-start my-2">{t("monthlySalaryDetails")}</th>
			<div className="w-full overflow-x-auto">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="bg-gray-100">
							<th className="p-2 text-center border min-w-fit text-nowrap">
								{t("tableHeaders.netSalary")}
							</th>
							<th className="p-2 text-center border min-w-fit text-nowrap">
								{t("tableHeaders.increase")}
							</th>
							<th className="p-2 text-center border min-w-fit text-nowrap">
								{t("tableHeaders.allowance")}
							</th>
							<th className="p-2 text-center border min-w-fit text-nowrap">
								{t("tableHeaders.totalDeductions")}
							</th>
							<th className="p-2 text-center border min-w-fit text-nowrap">
								{t("tableHeaders.totalBonus")}
							</th>
							<th className="p-2 text-center border min-w-fit text-nowrap">
								{t("tableHeaders.overtime")}
							</th>
							<th className="p-2 text-center border min-w-fit text-nowrap">
								{t("tableHeaders.totalSalary")}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="p-2 text-center border">6400</td>
							<td className="p-2 text-center border">400</td>
							<td className="p-2 text-center border">200</td>
							<td className="p-2 text-center border">1000</td>
							<td className="p-2 text-center border">1000</td>
							<td className="text-center border h-full">
								<div className="flex text-nowrap h-[40px] items-center w-full">
									<div className="bg-green-100 rounded w-2/4 h-full flex justify-center items-center p-1">
										<p>3 {t("hours")}</p>
									</div>
									<div className="rounded w-2/4 h-full flex justify-center items-center p-1">
										<p>200</p>
									</div>
								</div>
							</td>
							<td className="p-2 text-center border">3000</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
