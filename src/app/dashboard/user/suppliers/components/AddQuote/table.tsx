"use client";

import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, updateField } from "./priceOffer.slice";

export default function PriceOfferTable() {
	const dispatch = useDispatch();
	const { products }: { products: any[] } = useTypedSelector(
		(state) => state.priceOffer
	);

	useEffect(() => {
		dispatch(calculateTotals());
	}, [products, dispatch]);

	const handleInputChange = (
		index: number,
		field: string,
		value: string | number
	) => {
		dispatch(updateField({ index, field, value }));
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-emerald-100">
						<th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
							كود المنتج
						</th>
						<th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
							فئة المنتج
						</th>
						<th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
							اسم المنتج
						</th>
						<th className="border text-nowrap py-3 border-gray-300  bg-emerald-500 text-white">
							الكمية المطلوبة
						</th>
						<th className="border text-nowrap py-3 border-gray-300 ">
							الإجمالي
						</th>
						<th className="border text-nowrap py-3 border-gray-300 ">الوصف</th>
						<th className="border text-nowrap py-3 border-gray-300 ">خصم</th>
						<th className="border text-nowrap py-3 border-gray-300 ">ضريبة</th>
						<th className="border text-nowrap py-3 border-gray-300 ">
							وحدة البيع
						</th>
						<th className="border text-nowrap py-3 border-gray-300 ">
							الكمية المتاحة
						</th>
						<th className="border text-nowrap py-3 border-gray-300 ">
							الأجمالي
						</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr key={index} className="hover:bg-gray-50">
							<td className="border border-gray-300 p-2 text-nowrap text-center">
								{product.total}
							</td>
							<td className="min-w-[124px] border border-gray-300 p-2 text-nowrap">
								<input
									type="text"
									value={product.description}
									onChange={(e) =>
										handleInputChange(index, "description", e.target.value)
									}
									className="w-full p-1 border-none rounded"
								/>
							</td>
							<td className="min-w-[124px] border border-gray-300 p-2 text-nowrap">
								<input
									type="number"
									value={product.discount}
									onChange={(e) =>
										handleInputChange(index, "discount", e.target.value)
									}
									className="w-full p-1 border-none rounded"
								/>
							</td>
							<td className="min-w-[124px] border border-gray-300 p-2 text-nowrap">
								<input
									type="number"
									value={product.tax}
									onChange={(e) =>
										handleInputChange(index, "tax", e.target.value)
									}
									className="w-full p-1 border-none rounded"
								/>
							</td>
							<td className="min-w-[124px] border border-gray-300 p-2 text-nowrap">
								<input
									type="number"
									value={product.salesUnit}
									onChange={(e) =>
										handleInputChange(index, "salesUnit", e.target.value)
									}
									className="w-full p-1 border-none rounded"
								/>
							</td>
							<td className="min-w-[124px] border border-gray-300 p-2 text-nowrap">
								<input
									type="number"
									value={product.availableQuantity}
									onChange={(e) =>
										handleInputChange(
											index,
											"availableQuantity",
											e.target.value
										)
									}
									className="w-full p-1 border-none rounded"
								/>
							</td>
							<td className="min-w-[124px]  border border-gray-300 p-2 text-nowrap text-center">
								{product.requiredQuantity}
							</td>
							<td className="min-w-[124px]  border border-gray-300 p-2 text-nowrap text-center">
								{product.productName}
							</td>
							<td className="min-w-[124px]  border border-gray-300 p-2 text-nowrap text-center">
								{product.productCategory}
							</td>
							<td className="min-w-[124px]  border border-gray-300 p-2 text-nowrap text-center">
								{product.productCode}
							</td>
							<td className="min-w-[124px]  border border-gray-300 p-2 text-nowrap text-center">
								500
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr className="">
						{Array.from({
							length: 10,
						}).map((el) => (
							<td className="border border-gray-300 p-2 text-nowrap text-center"></td>
						))}
						<td className="border border-gray-300 p-2 text-nowrap text-center font-bold bg-[#02140D] text-white">
							{products.reduce((sum, product) => sum + (product.total || 0), 0)}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}