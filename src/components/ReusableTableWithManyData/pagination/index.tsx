import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export default function TablePagination({
	setPageIndex,
	pageIndex,
	filteredData,
	pageSize,
}: {
	setPageIndex: (value: React.SetStateAction<number>) => void;
	filteredData: any[];
	pageIndex: number;
	pageSize: any;
}) {
	const { t } = useTypedTranslation();
	return (
		<div
			className={cn(
				"flex items-start justify-between mt-4 w-full p-6",
				t("dir") === "ltr" ? "flex-row-reverse " : "flex-row"
			)}
		>
			{" "}
			<Button
				variant={"secondary"}
				className={cn(
					"cursor-pointer",
					t("dir") === "ltr" ? "flex-row-reverse " : "flex-row"
				)}
				onClick={() =>
					setPageIndex((prev) =>
						prev + 1 < Math.ceil(filteredData?.length / pageSize)
							? prev + 1
							: prev
					)
				}
				disabled={
					filteredData.length <= pageSize ||
					(pageIndex + 1) * pageSize >= filteredData.length
				}
			>
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.33301 5.99992H10.6663M10.6663 5.99992L5.99967 1.33325M10.6663 5.99992L5.99967 10.6666"
						stroke="#1E1E1E"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{t("pagination.next")}
			</Button>
			<div className="md:flex hidden flex-col items-center justify-center gap-4">
				<div className="flex items-center justify-center">
					{(() => {
						const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
						const currentPage = pageIndex + 1;

						const pagesToShow: (number | string)[] = [];

						pagesToShow.push(1);
						if (totalPages >= 2) pagesToShow.push(2);

						const rangeStart = Math.max(3, currentPage - 1);
						const rangeEnd = Math.min(totalPages - 2, currentPage + 1);

						if (rangeStart > 3) pagesToShow.push("ellipsis1");

						for (let i = rangeStart; i <= rangeEnd; i++) {
							pagesToShow.push(i);
						}

						if (rangeEnd < totalPages - 2) pagesToShow.push("ellipsis2");

						if (totalPages > 3) pagesToShow.push(totalPages - 1);
						if (totalPages > 2) pagesToShow.push(totalPages);

						const uniquePages = [...new Set(pagesToShow.filter(Boolean))].sort(
							(a, b) =>
								typeof a === "number" && typeof b === "number" ? a - b : 0
						);

						return (
							<div
								className={cn(
									"flex flex-row items-center gap-1",
									t("dir") === "rtl" ? "flex-row-reverse " : "flex-row"
								)}
							>
								{uniquePages.map((page, index) => {
									if (typeof page === "string" && page.startsWith("ellipsis")) {
										return (
											<span key={`ellipsis-${index}`} className="px-2">
												...
											</span>
										);
									}

									return (
										<Button
											key={page}
											variant="ghost"
											className={cn(
												"w-8 h-8 p-0 min-w-[32px] font-semibold",
												page === currentPage
													? "bg-black text-white hover:bg-black hover:text-white "
													: "text-gray-600"
											)}
											onClick={() => setPageIndex((page as number) - 1)}
										>
											{page}
										</Button>
									);
								})}
							</div>
						);
					})()}
				</div>
			</div>
			<Button
				variant={"secondary"}
				className={cn(
					"cursor-pointer",
					t("dir") === "ltr" ? "flex-row-reverse " : "flex-row"
				)}
				onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
				disabled={pageIndex === 0 || filteredData.length <= pageSize}
			>
				{t("pagination.prev")}
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10.6663 5.99992H1.33301M1.33301 5.99992L5.99967 10.6666M1.33301 5.99992L5.99967 1.33325"
						stroke="#1E1E1E"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</Button>
		</div>
	);
}
