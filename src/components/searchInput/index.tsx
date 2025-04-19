"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CustomInput from "../customInput";

export default function SearchBar() {
	const [query, setQuery] = useState("");

	return (
		<div className="md:w-[360px] w-full  md:p-4">
			<div className="relative bg-white border-gray-200 border rounded-lg">
				<CustomInput
					type="text"
					placeholder="ابحث هنا"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
          wrapperClassName="ps-10 h-[40px] rounded-[8px]  border-none text-right text-lg"
          className="border-none placeholder:text-[#49454F]"
				/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<Search className="h-6 w-6 text-gray-400" />
				</div>
			</div>
		</div>
	);
}
