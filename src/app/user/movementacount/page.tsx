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


export default function Page() {
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
			header: t("movementacount.head.date"),
			accessorKey: "date",
		},
		{
			header: t("movementacount.head.account"),
			accessorKey: "account",
		},
		{
			header: t("movementacount.head.referenceNumber"),
			accessorKey: "referenceNumber",
		},
		{
			header: t("movementacount.head.transactionType"),
			accessorKey: "transactionType",
		},
		{
			header: t("movementacount.head.debit"),
			accessorKey: "debit",
		},
		{
			header: t("movementacount.head.credit"),
			accessorKey: "credit",
		},
		{
			header: t("movementacount.head.employee"),
			accessorKey: "employee",
		},
	];

	return (
		<div className="ml-auto ">
			<ReusableManyTable
				dataSets={[
					{
						columns: orderProductColumns,
						data: orderProductsData || [],
						loading: orderProductsLoading,
						UserComponent: () => (
							<div className="w-full p-6 overflow-scroll">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<CustomInput
										label={t("movementacount.table.from")}
										type="date"
										className="w-full"
									/>
									<CustomInput
										label={t("movementacount.table.to")}
										type="date"
										className="w-full"
									/>
									<CustomSelect
										label={t("movementacount.table.account")}
										options={["نقاط البيع", "كاش", "تحويل بنكي"]}
										triggerClassName="!h-[48px] w-full bg-white border border-gray-300 rounded-lg shadow-sm"
									/>
									<div className="flex items-end">
										<CustomPopUp
											DialogTriggerComponent={() => (
												<Button className="w-[182px]  h-[48px] bg-[#16C47F] hover:bg-[#13A66C] text-white rounded-lg">
													{t("movementacount.table.acction")}
												</Button>
											)}
											DialogContentComponent={({ closePopup }) => (
												<div className="p-6 bg-white rounded-md w-full max-w-[600px]">
													<MovementAccountTopComponent />
												</div>
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
