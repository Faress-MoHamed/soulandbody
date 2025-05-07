"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import LoadingIndicator from "@/components/loadingIndicator";
// import {
// 	useEmployee,
// 	useGetAllFacilaties,
// 	useGetAlldepartments,
// } from "../useEmployee";
import CustomPopUp from "@/components/popups";

import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import CustomPasswordInput from "@/components/custom-password-input";
import { setEmployeeData } from "@/app/dashboard/hr/employees/add/createNewEmployee.slice";
import {
	useEmployee,
	useGetAllFacilaties,
	useGetAlldepartments,
} from "@/app/dashboard/hr/employees/useEmployee";

interface ProfessionalDataFormProps {
	employeeId?: string;
	withTitle?: boolean;
	withEmployeeManagement?: boolean;
	CardStyle?: string;
	ButtonSubmit?: React.ComponentType<any>;
	viewMode?: boolean; // Added viewMode prop
}

export default function ProfessionalDataForm({
	employeeId,
	withTitle = true,
	withEmployeeManagement = true,
	CardStyle,
	ButtonSubmit,
	viewMode = true, // Default to false
}: ProfessionalDataFormProps) {
	const employee = useTypedSelector((state) => state.employee.employee);
	const t = useTranslations();
	const buttonRef = useRef(null);

	const { data: allFacilaties, isLoading: facilatiesLoading } =
		useGetAllFacilaties();
	const { data: alldepartments, isLoading: departmentsLoading } =
		useGetAlldepartments();

	// Memoize facility options
	const facilityOptions = useMemo(
		() =>
			allFacilaties?.map((el: { name: any; id: any }) => ({
				label: el?.name,
				value: el?.id,
			})) || [],
		[allFacilaties]
	);

	// Memoize department options
	const departmentOptions = useMemo(
		() =>
			alldepartments?.map((el: { name: any; id: any }) => ({
				label: el?.name,
				value: el?.id,
			})) || [],
		[alldepartments]
	);

	// Get label for a value from options
	const getLabelFromValue = useCallback(
		(value: string, options: { label: string; value: string }[]) => {
			const option = options.find((opt) => opt.value === value);
			console.log(option, options);
			return option ? option.label : value;
		},
		[]
	);

	return (
		<div className="space-y-2">
			<Card
				className={cn(
					"border-none bg-transparent shadow-none rounded-md p-6",
					CardStyle
				)}
			>
				{
					<CardContent className="p-0">
						<div className="space-y-6 flex flex-col">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
								{/* First Row */}
								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.email")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{employee.email || "-"}
										</div>
									</div>
								) : (
									<CustomInput
										label={t("professionalData.form.fields.email")}
										name="email"
										value={employee.email}
										type="text"
										className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
										onChange={() => {}}
										disabled={viewMode}
									/>
								)}

								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.password")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{"•".repeat(8)}
										</div>
									</div>
								) : (
									<CustomPasswordInput
										label={t("professionalData.form.fields.password")}
										name="password"
										value={employee.password}
										className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] text-start"
										onChange={() => {}}
										disabled={viewMode}
									/>
								)}

								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.total_salary")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{employee.net_salary || "-"}
										</div>
									</div>
								) : (
									<CustomInput
										label={t("professionalData.form.fields.total_salary")}
										name="totalsalary"
										value={employee.net_salary}
										type="number"
										className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
										onChange={() => {}}
										disabled={viewMode}
									/>
								)}
								<div></div>

								{/* Second Row */}
								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.facility")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{getLabelFromValue(
												employee.facility_id?.toString() || "",
												facilityOptions
											) || "-"}
										</div>
									</div>
								) : (
									<CustomSelect
										label={t("professionalData.form.fields.facility")}
										name="facility"
										options={facilityOptions}
										onValueChange={() => {}}
										value={
											typeof employee.facility_id === "string"
												? employee.facility_id
												: typeof employee.facility_id === "number"
												? (employee.facility_id as number).toString()
												: ""
										}
										className="text-start"
										disabled={viewMode}
									/>
								)}

								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.department")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{getLabelFromValue(
												employee.department_id?.toString() || "",
												departmentOptions
											) || "-"}
										</div>
									</div>
								) : (
									<CustomSelect
										label={t("professionalData.form.fields.department")}
										name="department"
										options={departmentOptions}
										loading={departmentsLoading}
										value={
											typeof employee.department_id === "string"
												? employee.department_id
												: typeof employee.department_id === "number"
												? (employee.department_id as number).toString()
												: ""
										}
										className="text-start"
										onValueChange={() => {}}
										disabled={viewMode}
									/>
								)}

								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.user_type")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{employee.role || "-"}
										</div>
									</div>
								) : (
									<CustomSelect
										label={t("professionalData.form.fields.user_type")}
										name="userType"
										options={["user", "admin"]}
										value={employee.role}
										className="text-start"
										onValueChange={() => {}}
										disabled={viewMode}
									/>
								)}
								<div></div>

								{/* Third Row */}
								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.work_nature")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{employee.job_nature || "-"}
										</div>
									</div>
								) : (
									<CustomSelect
										label={t("professionalData.form.fields.work_nature")}
										name="workNature"
										options={["full_time", "various"]}
										className="text-start"
										value={employee.job_nature}
										onValueChange={() => {}}
										disabled={viewMode}
									/>
								)}

								{viewMode ? (
									<div className="flex flex-col gap-1">
										<label className="text-sm font-medium text-gray-500">
											{t("professionalData.form.fields.allowances")}
										</label>
										<div className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 border bg-white border-[#D9D9D9] text-start">
											{employee.allowance || "-"}
										</div>
									</div>
								) : (
									<CustomInput
										label={t("professionalData.form.fields.allowances")}
										name="allowance"
										value={employee.allowance}
										type="number"
										className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
										onChange={() => {}}
										disabled={viewMode}
									/>
								)}
								<div></div>
							</div>

							{!viewMode && ButtonSubmit && <ButtonSubmit ref={buttonRef} />}
						</div>
					</CardContent>
				}
			</Card>

			<ul className="p-6 text-[18px] flex flex-col md:gap-1 gap-1">
				<li className="flex flex-wrap">
					{t("employeeForm.leave.policy.intro")}
					<Button
						type="button"
						variant={"link"}
						className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
					>
						{parseFloat(employee.vacation_balance || "0") +
							" " +
							t("employeeForm.leave.policy.total_days")}
					</Button>
					{t("employeeForm.leave.policy.divided_into")}
					<Button
						type="button"
						variant={"link"}
						className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
					>
						{parseFloat(employee.regular_leave_balance || "0") +
							" " +
							t("employeeForm.leave.policy.regular_days")}
					</Button>
					{t("employeeForm.leave.policy.and")}
					<Button
						type="button"
						variant={"link"}
						className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
					>
						{parseFloat(employee.casual_leave_balance || "0") +
							" " +
							t("employeeForm.leave.policy.emergency_days")}
					</Button>
					{t("employeeForm.leave.policy.and")}
					<Button
						type="button"
						variant={"link"}
						className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
					>
						{parseFloat(employee.sick_leave_balance || "0") +
							" " +
							t("employeeForm.leave.policy.sick_days")}
					</Button>
				</li>
				<li>{t("employeeForm.leave.policy.exceed_notice")}</li>
				<li className="flex flex-wrap">
					{t("employeeForm.leave.policy.absence_intro")}
					<Button
						type="button"
						variant={"link"}
						className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
					>
						{parseFloat(employee.sick_leave_balance || "0") +
							" " +
							t("employeeForm.leave.policy.continuous_absence")}
					</Button>
					{t("employeeForm.leave.policy.or")}
					<Button
						type="button"
						variant={"link"}
						className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
					>
						{parseFloat(employee.sick_leave_balance || "0") +
							" " +
							t("employeeForm.leave.policy.separate_absence")}
					</Button>
					{parseFloat(employee.sick_leave_balance || "0") +
						" " +
						t("employeeForm.leave.policy.termination_notice")}
				</li>
			</ul>
		</div>
	);
}
