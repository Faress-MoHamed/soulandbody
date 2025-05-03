"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import {
	useOrderProducts,
	type OrderProductType,
} from "./hooks/useOrderProducts";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomPopUp from "@/components/popups";
import MovementAccountTopComponent from "./components/MovementAccount";


export default function page() {
	const { t } = useTypedTranslation();
	const { data: orderProductsData, isLoading: orderProductsLoading } =
		useOrderProducts();
	
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const toggleOption = (option: string) => {
		if (selectedOptions.includes(option)) {
			setSelectedOptions(selectedOptions.filter((item) => item !== option));
		} else {
			setSelectedOptions([...selectedOptions, option]);
		}
	};
	const orderProductColumns: ColumnDef<OrderProductType>[] = [
		{
			header: t("movementacount.employee"),
			accessorKey: "date",
		},
		{
			header: "حساب",
			accessorKey: "account",
		},
		{
			header: "رقم المرجع",
			accessorKey: "referenceNumber",
		},
		{
			header: "نوع الحركة",
			accessorKey: "transactionType",
		},
		{
			header: "مدين",
			accessorKey: "debit",
		},
		{
			header: "دائن",
			accessorKey: "credit",
		},
		{
			header: "نوع الحركة",
			accessorKey: "transactionType",
		},
		{
			header: "الموظف",
			accessorKey: "employee",
		},
	];


	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns: orderProductColumns,
						data: orderProductsData || [],
						loading: orderProductsLoading,
						UserComponent: () => (
							<div className="w-full p-6 ">
								<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
									<CustomInput label="من" type="date" className="w-full" />
									<CustomInput label="إلى" type="date" className="w-full" />
									<CustomSelect
										label="الحساب"
										options={["نقاط البيع", "كاش", "تحويل بنكي"]}
										triggerClassName="!h-[48px] w-full bg-white border border-gray-300 rounded-lg shadow-sm"
									/>
									<div className="flex items-end">
										<CustomPopUp
											DialogTriggerComponent={() => (
												<Button className=" h-[48px] w-[182px] bg-[#16C47F] hover:bg-[#13A66C] text-white rounded-lg">
													تنفيذ
												</Button>
											)}
											DialogContentComponent={({ closePopup }) => (
												<MovementAccountTopComponent />
											)}
										/>
									</div>
								</div>
							</div>
						),
						label: t("ordersInUser.ordersList"),
						withPrinter: true,
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
