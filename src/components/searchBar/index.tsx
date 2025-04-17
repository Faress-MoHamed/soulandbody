import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function SearchBar() {
	const { t } = useTypedTranslation();
	return (
		<div className="relative text-black block">
			<Search className="absolute start-3 top-3.5 h-4 w-4 text-black" />
			<Input
				placeholder={t("header.searchHere")}
				className="ps-9 md:w-[395px]  h-[40px] rounded-[8px] border border-[#D9D9D9] placeholder:text-black"

				// value={globalFilter}
				// onChange={(e) => setGlobalFilter(e.target.value)}
			/>
		</div>
	);
}
