"use client";

import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

interface ButtonSubmitProps {
	employeeId?: string | number | null;
	onFormSubmit?: () => void;
}

export const ButtonSubmit = forwardRef<HTMLButtonElement, ButtonSubmitProps>(
	({ employeeId, onFormSubmit }, ref) => {
		const { t } = useTypedTranslation();

		return (
			<div className="text-start mt-6">
				<Button
					type="submit"
					ref={ref}
					onClick={onFormSubmit}
					className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
				>
					{employeeId
						? t("professionalData.form.buttons.update")
						: t("professionalData.form.buttons.save")}
				</Button>
			</div>
		);
	}
);

ButtonSubmit.displayName = "ButtonSubmit";
