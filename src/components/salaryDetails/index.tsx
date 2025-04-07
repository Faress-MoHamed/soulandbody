export default function SalaryDetailsTable() {
	return (
		<table className="w-full border-collapse">
			<thead>
				<tr>
					<th
						colSpan={8}
						className=" p-2 text-right font-bold text-lg border-b"
					>
						تفاصيل الراتب الشهري
					</th>
				</tr>
				<tr className="bg-gray-100">
					<th className="p-2 text-right border">صافي المرتب</th>
					<th className="p-2 text-right border">زيادة</th>
					<th className="p-2 text-right border">البدل</th>
					<th className="p-2 text-right border">اجمالي الخصم</th>
					<th className="p-2 text-right border">اجمالي المكفأة</th>
					<th className="p-2 text-right border">وقت اضافي</th>
					<th className="p-2 text-right border">اجمالي المرتب</th>
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
						<div className="flex h-[40px] flex-1 items-center justify-center">
							<p className="flex-1 ">200</p>
							<div className="bg-green-100 rounded flex-1 h-full flex justify-center items-center">
								<p>3 ساعات</p>
							</div>
						</div>
					</td>
					<td className="p-2 text-center border">3000</td>
				</tr>
			</tbody>
		</table>
	);
}
