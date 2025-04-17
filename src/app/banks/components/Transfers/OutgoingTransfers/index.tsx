"use client";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function OutgoingTransfers() {
	const { t } = useTypedTranslation();

	const validationSchema = Yup.object({
		date: Yup.date().required(t("OutgoingTransfers.validation.dateRequired")),
		bankName: Yup.string().required(t("OutgoingTransfers.validation.bankNameRequired")),
		accountName: Yup.string().required(t("OutgoingTransfers.validation.accountNameRequired")),
		accountNumber: Yup.string().required(t("OutgoingTransfers.validation.accountNumberRequired")),
		amount: Yup.number()
			.positive(t("OutgoingTransfers.validation.amountPositive"))
			.required(t("OutgoingTransfers.validation.amountRequired")),
	});

	const formik = useFormik({
		initialValues: {
			date: "",
			bankName: "",
			accountName: "",
			accountNumber: "",
			amount: "",
		},
		validationSchema,
		onSubmit: (values) => {
			console.log("Form values:", values);
			// Handle form submission here
		},
	});

	return (
		<div className="flex flex-col gap-12 p-6">
			<h2 className="text-[26px] font-bold">{t("OutgoingTransfers.forms.outgoingTransfer")}</h2>
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col gap-6 justify-center items-center"
			>
			<div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:w-auto w-full content-center">
					<CustomInput
						label={t("OutgoingTransfers.forms.date")}
						type="date"
						name="date"
						value={formik.values.date}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.date && formik.errors.date}
					/>
					<CustomInput
						label={t("OutgoingTransfers.forms.bankName")}
						name="bankName"
						value={formik.values.bankName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.bankName && formik.errors.bankName}
					/>
					<CustomInput
						label={t("OutgoingTransfers.forms.accountName")}
						name="accountName"
						value={formik.values.accountName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.accountName && formik.errors.accountName}
					/>
				</div>
			<div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:w-auto w-full content-center">
					<CustomInput
						label={t("OutgoingTransfers.forms.accountNumber")}
						name="accountNumber"
						value={formik.values.accountNumber}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.accountNumber && formik.errors.accountNumber}
					/>
					<CustomInput
						label={t("OutgoingTransfers.forms.amount")}
						name="amount"
						type="number"
						value={formik.values.amount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.amount && formik.errors.amount}
					/>
				</div>
				<Button
					type="submit"
					className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]"
				>
					{t("OutgoingTransfers.forms.transfer")}
				</Button>
			</form>
		</div>
	);
}
