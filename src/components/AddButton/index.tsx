import React from "react";
import { Button } from "../ui/button";

export default function AddButton({
	onClickAdd,
	AddTitle,
}: {
	onClickAdd?: any;
	AddTitle?: string;
}) {
	return (
		AddTitle &&
		onClickAdd && (
			<Button
				onClick={onClickAdd}
				className="bg-emerald-500 hover:bg-emerald-600 w-[148px] h-[44px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]"
			>
				<img src="./add.svg" className="h-6 w-6 mr-2" />
				{AddTitle}
			</Button>
		)
	);
}
