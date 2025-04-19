"use client";
import TaxOnInvoice from "@/app/companies/SalesInvoices/components/TaxOnInvoice";
import TaxOnProduct from "@/app/companies/SalesInvoices/components/TaxOnProduct";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomPopUp from "@/components/popups";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";

export default function ReturnTopComponent({
	selectedInvoice,
	setSelectedInvoice,
}: {
	selectedInvoice: any;
	setSelectedInvoice: any;
}) {
	const t = useTranslations("returnTopComponent");

	// Transform invoice options to use translations
	const invoiceOptions = ["invoice1", "invoice2", "invoice3"].map((option) => ({
		value: option,
		label: t(`invoiceOptions.${option}`),
	}));

	return (
		<div className="border-x border-t p-6 flex flex-col gap-5 bg-white">
			<div className="flex justify-between items-center">
				<h1 className="text-[26px] font-[700] text-[#02140D]">{t("title")}</h1>
				<h1 className="text-[36px] font-[600] text-[#02140D]">S00026</h1>
			</div>
			<div className="self-end flex gap-4">
				<CustomPopUp
					DialogTriggerComponent={() => (
						<Button
							className="h-[44px] border-[#16C47F] hover:bg-transparent dark:hover:bg-transparent px-3 py-[10px]"
							variant={"outline"}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
									fill="#45D099"
								/>
							</svg>

							<p className="font-[500] text-[#16C47F] ">
								{t("buttons.taxOnInvoice")}
							</p>
						</Button>
					)}
					DialogContentComponent={() => <TaxOnInvoice />}
				/>
				<CustomPopUp
					DialogTriggerComponent={() => (
						<Button
							className="h-[44px] border-[#16C47F] hover:bg-transparent dark:hover:bg-transparent px-3 py-[10px]"
							variant={"outline"}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
									fill="#45D099"
								/>
							</svg>

							<p className="font-[500] text-[#16C47F] ">
								{t("buttons.discountOnInvoice")}
							</p>
						</Button>
					)}
					DialogContentComponent={() => <TaxOnProduct />}
				/>
			</div>
			<div className="flex gap-5">
				<CustomInput
					label={t("inputs.date")}
					type="month"
					wrapperClassName="w-[302px] "
					className="h-[48px]"
				/>

				<CustomSelect
					label={t("inputs.invoiceNumber")}
					options={invoiceOptions}
					triggerClassName="!h-[48px] w-[302px] bg-white"
					value={selectedInvoice}
					onValueChange={(e) => setSelectedInvoice(e)}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<h1 className="text-[22px] font-[500]">{t("customerInfo.title")}</h1>
				<div className="flex gap-5 items-center">
					<CustomInput
						label={t("customerInfo.name")}
						type="text"
						wrapperClassName="w-[302px] "
						className="h-[48px]"
					/>
					<CustomInput
						label={t("customerInfo.number")}
						type="text"
						wrapperClassName="w-[302px] "
						className="h-[48px]"
					/>
					<CustomInput
						label={t("customerInfo.address")}
						type="text"
						wrapperClassName="w-[302px] "
						className="h-[48px]"
					/>
					<CustomInput
						label={t("customerInfo.discounts")}
						type="text"
						wrapperClassName="w-[302px] "
						className="h-[48px]"
					/>
				</div>
			</div>
		</div>
	);
}
