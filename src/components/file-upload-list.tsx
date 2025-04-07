"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileUpload } from "./uploadFile";
import CustomCard from "./customCard";
import CustomPopUp from "./popups";

interface FileUploadListProps {
	files: {
		id: string;
		name: string;
		size: string;
		type: string;
	}[];
	onDelete: (id: string) => void;
}

export default function FileUploadList({
	files,
	onDelete,
}: FileUploadListProps) {
	return (
		<div className="bg-white">
			<div className="divide-y flex flex-col gap-8 ">
				{files.map((file) => (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<div
								key={file.id}
								className="flex items-center justify-between p-4 bg-[#E8F9F2] rounded-[12px] cursor-pointer"
							>
								{" "}
								<div className="flex items-center">
									<Image
										src={"/pdf.svg"}
										width={40}
										height={40}
										alt="pdf"
										className="ml-3"
									/>
									<div className="text-right flex flex-col gap-1">
										<div className="font-medium text-gray-900">{file.name}</div>
										<div className="text-sm text-gray-500">{file.size}</div>
									</div>
								</div>
								<div className="flex items-center">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
										onClick={() => onDelete(file.id)}
									>
										<Trash2 className="h-5 w-5" />
									</Button>
								</div>
							</div>
						)}
						DialogContentComponent={() => (
							<CustomCard
								withButton={false}
								title={"رفع ملف، شهادة النجاح"}
								width={556}
								height={450}
								className={`lg:w-[556px] lg:h-[350px] h-[300px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
											[&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
								Content={<FileUpload />}
							/>
						)}
					/>
				))}
			</div>
		</div>
	);
}
