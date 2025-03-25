import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function Header() {
	return (
		<div className="flex justify-between items-center px-12">
			{/* logo */}
			<div className="max-w-full flex items-center gap-[13px]">
				<div className="max-w-full rounded-full">
					<img src="./logo.svg" className="w-[27px] h-[27px]" alt="" />
				</div>
				<p className="text-[24px]">مرحبا بك في شركة SB</p>
			</div>
			{/* seatch */}
			<div className="relative text-black">
				<Search className="absolute right-3 top-5 h-4 w-4 text-black" />
				<Input
					placeholder="ابحث هنا"
					className="pr-9 min-w-[360px] h-[56px] max-[720px] rounded-[16px] md:w-1/3 bg-[#007DFC1A] border-none placeholder:text-black"

					// value={globalFilter}
					// onChange={(e) => setGlobalFilter(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-1 font-bold">
				<img src="./image.png" className="w-[47px] h-[47px]" alt="" />
				<p className="text-[18px] font-cairo">د/احمد ابراهيم</p>
			</div>
		</div>
	);
}
