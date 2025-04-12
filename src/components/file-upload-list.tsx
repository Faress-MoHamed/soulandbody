"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileUpload } from "./uploadFile";
import CustomCard from "./customCard";
import CustomPopUp from "./popups";
import Link from "next/link";

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
		<div className="">
			<div className="divide-y flex flex-col gap-8 ">
				{files.map((file) => (
					<div
						key={file.id}
						className="flex items-center justify-between p-4 bg-[#E8F9F2] rounded-[12px] cursor-pointer"
					>
						{" "}
						<Link
						href={
							"https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
						}
						target="_blank" className="flex items-center flex-1">
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
						</Link>
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
				))}
			</div>
		</div>
	);
}
