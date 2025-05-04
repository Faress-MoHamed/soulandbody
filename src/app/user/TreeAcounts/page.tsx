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
import MovementAccountTopComponent from "../movementacount/components/MovementAccount";


export default function page() {
	const { t } = useTypedTranslation();
	const { data: orderProductsData, isLoading: orderProductsLoading } =
		useOrderProducts();


	
	const orderProductColumns: ColumnDef<OrderProductType>[] = [
		{
			header: t("treeAcounts.head.date"),
			accessorKey: "date",
		},
		{
			header: t("treeAcounts.head.account"),
			accessorKey: "account",
		},
		{
			header: t("treeAcounts.head.referenceNumber"),
			accessorKey: "referenceNumber",
		},
		{
			header: t("treeAcounts.head.transactionType"),
			accessorKey: "transactionType",
		},
		{
			header: t("treeAcounts.head.debit"),
			accessorKey: "debit",
		},
		{
			header: t("treeAcounts.head.credit"),
			accessorKey: "credit",
		},
		{
			header: t("treeAcounts.head.transactionType"),
			accessorKey: "transactionType",
		},
		{
			header: t("treeAcounts.head.employee"),
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
										label={t("treeAcounts.table.from")}
										type="date"
										className="w-full"
									/>
									<CustomInput
										label={t("treeAcounts.table.to")}
										type="date"
										className="w-full"
									/>
									<CustomSelect
										label={t("treeAcounts.table.account")}
										options={["نقاط البيع", "كاش", "تحويل بنكي"]}
										triggerClassName="!h-[48px] w-full bg-white border border-gray-300 rounded-lg shadow-sm"
									/>
									<div className="flex items-end">
										<CustomPopUp
											DialogTriggerComponent={() => (
												<Button className="w-[182px]  h-[48px] bg-[#16C47F] hover:bg-[#13A66C] text-white rounded-lg">
													{t("treeAcounts.table.acction")}
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
						withPrinter: true
					},

				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
