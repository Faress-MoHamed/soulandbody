"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/customSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function AddBank() {
	const { t } = useTypedTranslation();

	const validationSchema = Yup.object({
		bankName: Yup.string().required(t("AddBank.formErrors.bankName")),
		branchName: Yup.string().required(t("AddBank.formErrors.branchName")),
		accountNumber: Yup.string().required(t("AddBank.formErrors.accountNumber")),
		initialBalance: Yup.number()
			.typeError(t("AddBank.formErrors.initialBalanceType"))
			.required(t("AddBank.formErrors.initialBalance")),
		type: Yup.string().required(t("AddBank.formErrors.type")),
	});

	const formik = useFormik({
		initialValues: {
			bankName: "",
			branchName: "",
			accountNumber: "",
			initialBalance: "",
			type: "",
		},
		validationSchema,
		onSubmit: (values) => {
			console.log("Form values:", values);
			// handle submit
		},
	});

	return (
		<Card className="flex flex-col p-4 gap-6">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("AddBank.bank.addNew")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={formik.handleSubmit}
					className="grid md:grid-cols-2 grid-cols-1 items-end gap-6"
				>
					<CustomInput
						label={t("AddBank.bank.name")}
						type="text"
						name="bankName"
						value={formik.values.bankName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.bankName && formik.errors.bankName}
					/>
					<CustomInput
						label={t("AddBank.bank.branch")}
						type="text"
						name="branchName"
						value={formik.values.branchName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.branchName && formik.errors.branchName}
					/>
					<CustomInput
						label={t("AddBank.bank.accountNumber")}
						type="text"
						name="accountNumber"
						value={formik.values.accountNumber}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.accountNumber && formik.errors.accountNumber}
					/>
					<CustomInput
						label={t("AddBank.bank.initialBalance")}
						type="text"
						name="initialBalance"
						value={formik.values.initialBalance}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.initialBalance && formik.errors.initialBalance
						}
					/>
					<CustomSelect
						label={t("AddBank.bank.type")}
						options={[t("AddBank.bank.credit"), t("AddBank.bank.debit")]}
						name="type"
						value={formik.values.type}
						onValueChange={(value) => formik.setFieldValue("type", value)}
						error={formik.touched.type && formik.errors.type}
					/>
					<Button
						type="submit"
						className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8"
					>
						{t("AddBank.actions.save")}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
