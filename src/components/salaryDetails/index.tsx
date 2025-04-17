export default function SalaryDetailsTable() {
	return (
		<>
			<th  className="flex justify-start my-2">تفاصيل الراتب الشهري</th>
			<div className="w-full overflow-x-auto">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="bg-gray-100">
							<th className="p-2 text-right border min-w-fit text-nowrap">
								صافي المرتب
							</th>
							<th className="p-2 text-right border min-w-fit text-nowrap">
								زيادة
							</th>
							<th className="p-2 text-right border min-w-fit text-nowrap">
								البدل
							</th>
							<th className="p-2 text-right border min-w-fit text-nowrap">
								اجمالي الخصم
							</th>
							<th className="p-2 text-right border min-w-fit text-nowrap">
								اجمالي المكفأة
							</th>
							<th className="p-2 text-right border min-w-fit text-nowrap">
								وقت اضافي
							</th>
							<th className="p-2 text-right border min-w-fit text-nowrap">
								اجمالي المرتب
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
							<td className="text-center  border h-full">
								<div className="flex min-w-fit text-nowrap h-[40px] items-center justify-center">
									<p className="flex-1 text-center max-w-fit">200</p>
									<div className="bg-green-100 rounded flex-1 h-full flex justify-center items-center max-w-fit p-1">
										<p>3 ساعات</p>
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
