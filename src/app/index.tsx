"use client";

import Header from "@/components/Header";
import HomeSideBar from "@/components/homeSideBar";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function Home({ children }: { children: any }) {
	const { open } = useSidebar();
	return (
		<div className={cn(open ? "flex flex-1 justify-between w-full not-md:max-w-auto" : "")}>
			<HomeSideBar />
			<div
		 	    // style={{
				// 	paddingInline: open ? 0 : "auto",
				// }}
				style={{
					maxWidth: open ? "calc(95vw - 20rem)" : "",
				}}
				className={cn(
					" lg:px-[80px] px-[20px] py-10 flex flex-col gap-[26px] ",
				open ? `lg:px-[40px] px-[10px] w-full` : `lg:px-[80px] px-[20px]`,
					{}
				)}
			>
				<Header />
				{children}
			</div>
		</div>
	);
}
