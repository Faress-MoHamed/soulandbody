"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomInput from "@/components/customInput";
import CustomPopUp from "@/components/popups";
import FileUpload from "@/components/uploadFile";
import EmployeeManagement from "@/app/hr/work-hours";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setEmployeeField } from "./createNewEmployee.slice";

interface EmployeeInformationFormContentProps {
	employeeId?: string | number;
	withTitle?: boolean;
	withEmployeeManagement?: boolean;
	CardStyle?: string;
	mode?: "edit" | "view";
	ButtonSubmit?: React.ComponentType<any>;
}

export default function EmployeeInformationFormContent({
	employeeId,
	withTitle = true,
	withEmployeeManagement = true,
	CardStyle,
	mode = "edit",
	ButtonSubmit,
}: EmployeeInformationFormContentProps) {
	const { t } = useTypedTranslation();
	const dispatch = useDispatch();
	const buttonRef = useRef(null);

	const employee = useTypedSelector((state) => state.employee.employee);
	console.log(employee);
	const [selectedWorkNature, setSelectedWorkNature] = useState("");

	return (
		<div className="space-y-2">
			<Card
				className={cn(
					"border-none bg-transparent shadow-none rounded-md p-6",
					CardStyle
				)}
			>
				<CardContent className="p-0">
					<div className="space-y-6 flex flex-col">
						{mode === "edit" && (
							<div className="text-end max-w-fit self-end">
								<CustomPopUp
									DialogTriggerComponent={() => (
										<Button
											type="button"
											className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-4 py-2"
										>
											{t("employeeForm.buttons.attachments")}
										</Button>
									)}
									DialogContentComponent={() => (
										<Card className="lg:w-[650px]">
											<CardHeader>
												{t("employeeForm.buttons.attachments")}
											</CardHeader>
											<CardContent className="p-6 max-h-full overflow-auto">
												<FileUpload />
											</CardContent>
										</Card>
									)}
								/>
							</div>
						)}

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
							{[
								{
									name: "name",
									label: t("employeeForm.fields.employee"),
								},
								{
									name: "phone",
									label: t("employeeForm.fields.phoneNumber"),
								},
								{
									name: "address",
									label: t("employeeForm.fields.address"),
								},
								{
									name: "birth_date",
									label: t("employeeForm.fields.birthDate"),
									type: "date",
								},
								{
									name: "qualification",
									label: t("employeeForm.fields.qualification"),
								},
								{
									name: "job",
									label: t("employeeForm.fields.position"),
								},
								{
									name: "job_start_date",
									label: t("employeeForm.fields.date"),
									type: "date",
								},
							].map(({ name, label, type = "text" }) => (
								<CustomInput
									key={name}
									label={label}
									name={name}
									type={type}
									disabled={mode !== "edit"}
									value={employee[name as keyof typeof employee] || ""}
									onChange={(e) => {
										dispatch(
											setEmployeeField({
												field: name as keyof typeof employee & string,
												value: e.target.value,
											})
										);
									}}
									className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
								/>
							))}
						</div>

						{mode === "edit" && ButtonSubmit && (
							<div
								className={cn(
									"text-start mt-6",
									`${
										selectedWorkNature ===
										t("employeeForm.fields.work_nature_options.varied")
											? "hidden"
											: ""
									}`
								)}
							>
								<ButtonSubmit ref={buttonRef} employeeId={employeeId} />
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* {withEmployeeManagement && (
				<div className="p-6">
					<EmployeeManagement
						mode={mode}
						saveHandler={() => {
							if (buttonRef?.current) {
								(buttonRef.current as any)?.click();
							}
						}}
					/>
				</div>
			)} */}
		</div>
	);
}
