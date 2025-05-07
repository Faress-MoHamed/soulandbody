"use client";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function OutgoingChecks() {
	const { t } = useTypedTranslation();

	// Define validation schema using Yup
	const validationSchema = Yup.object({
		date: Yup.date().required(t("IncomingChecks.validation.dateRequired")),
		bankName: Yup.string().required(
			t("IncomingChecks.validation.bankNameRequired")
		),
		accountName: Yup.string().required(
			t("IncomingChecks.validation.accountNameRequired")
		),
		checkNumber: Yup.string().required(
			t("IncomingChecks.validation.checkNumberRequired")
		),
		amount: Yup.number()
			.positive(t("IncomingChecks.validation.amountPositive"))
			.required(t("IncomingChecks.validation.amountRequired")),
		collectionDate: Yup.date().required(
			t("IncomingChecks.validation.collectionDateRequired")
		),
	});

	const formik = useFormik({
		initialValues: {
			date: "",
			bankName: "",
			accountName: "",
			checkNumber: "",
			amount: "",
			collectionDate: "",
		},
		validationSchema,
		onSubmit: (values) => {
			console.log("Form values:", values);
		},
	});

	return (
		<div className="flex flex-col gap-12 p-6">
			<h2 className="text-[26px] font-bold">
				{t("IncomingChecks.forms.outgoingChecks")}
			</h2>
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col gap-6 justify-center items-center"
			>
				<div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:w-auto w-full content-center">
					<CustomInput
						label={t("IncomingChecks.forms.date")}
						type="date"
						name="date"
						value={formik.values.date}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.date && formik.errors.date}
					/>
					<CustomInput
						label={t("IncomingChecks.forms.bankName")}
						name="bankName"
						value={formik.values.bankName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.bankName && formik.errors.bankName}
					/>
					<CustomInput
						label={t("IncomingChecks.forms.accountName")}
						name="accountName"
						value={formik.values.accountName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.accountName && formik.errors.accountName}
					/>
				</div>
				<div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:w-auto w-full content-center">
					<CustomInput
						label={t("IncomingChecks.forms.checkNumber")}
						name="checkNumber"
						value={formik.values.checkNumber}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.checkNumber && formik.errors.checkNumber}
					/>
					<CustomInput
						label={t("IncomingChecks.forms.amount")}
						name="amount"
						type="number"
						value={formik.values.amount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.amount && formik.errors.amount}
					/>
					<CustomInput
						label={t("IncomingChecks.forms.collectionDate")}
						type="date"
						name="collectionDate"
						value={formik.values.collectionDate}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.collectionDate && formik.errors.collectionDate
						}
					/>
				</div>
				<Button
					type="submit"
					className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]"
				>
					{t("IncomingChecks.forms.issue")}
				</Button>
			</form>
		</div>
	);
}
