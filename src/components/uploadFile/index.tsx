"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Upload, Check, X, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import FileUploadList from "../file-upload-list";
// import type { FileItem } from "@/app/test/page";
import CustomPopUp from "../popups";
import CustomCard from "../customCard";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import {
	setEmployeeAttachments,
	setEmployeeField,
	removeEmployeeAttachment,
} from "@/app/hr/employees/add/createNewEmployee.slice";

type UploadState = "idle" | "uploading" | "success";

export function FileUpload({ closePopup }: { closePopup?: any }) {
	const [uploadState, setUploadState] = useState<UploadState>("idle");
	const [progress, setProgress] = useState(0);
	const [fileName, setFileName] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		dispatch(setEmployeeAttachments(file));
		setFileName(file.name);
		simulateUpload(file);
	};

	const simulateUpload = (file: File) => {
		setUploadState("uploading");
		setProgress(0);

		// Simulate upload progress
		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				const newProgress = prevProgress + 1;
				if (newProgress >= 100) {
					clearInterval(interval);
					setUploadState("success");
					setTimeout(() => {
						closePopup();
					}, 1000);
					return 100;
				}
				return newProgress;
			});
		}, 10);
	};
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const file = e.dataTransfer.files[0];
			if (!file) return;

			setFileName(file.name);
			simulateUpload(file);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};
	return (
		<div className="flex flex-col gap-4 w-full items-center justify-center  p-4">
			<div className="flex flex-col w-full items-center justify-center">
				{uploadState === "idle" && (
					<>
						<div
							className="border-2 border-dashed border-gray-200 rounded-lg w-full flex p-6  pr-8 pt-6 pb-16 pl-8 flex-col items-center justify-center cursor-pointer"
							onClick={handleClick}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
						>
							<div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
								<Image src={"/uploadImage.svg"} width={48} height={48} alt="" />
							</div>

							<p className="text-center mb-2">
								<span>ارفع ملفاتك هنا</span>{" "}
								<span className="text-[#16C47F] font-bold">أو اضغط للرفع </span>
							</p>

							<p className="text-[12px] text-gray-400">
								SVG, PNG, JPG or GIF (max. 800x400px)
							</p>

							<input
								type="file"
								className="hidden"
								ref={fileInputRef}
								onChange={handleFileChange}
								accept=".svg,.png,.jpg,.jpeg,.gif"
							/>

							{fileName && (
								<div className="mt-4 text-sm text-green-600">{fileName}</div>
							)}
						</div>
					</>
				)}

				{uploadState === "uploading" && (
					<>
						<div className="relative w-16 h-16 mb-4">
							<svg className="w-full h-full" viewBox="0 0 36 36">
								<circle
									cx="18"
									cy="18"
									r="16"
									fill="none"
									className="stroke-gray-200"
									strokeWidth="2"
								/>
								<circle
									cx="18"
									cy="18"
									r="16"
									fill="none"
									className="stroke-emerald-500"
									strokeWidth="2"
									strokeDasharray="100"
									strokeDashoffset={100 - progress}
									transform="rotate(-90 18 18)"
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-sm font-medium">{progress}%</span>
							</div>
						</div>
						<p className="text-center">جاري التحميل</p>
					</>
				)}

				{uploadState === "success" && (
					<>
						<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
							<Check className="w-6 h-6 text-emerald-500" />
						</div>
						<p className="text-center">تم التحميل</p>
						{fileName && (
							<p className="text-sm text-gray-500 mt-2">{fileName}</p>
						)}
					</>
				)}
			</div>
		</div>
	);
}
export default function Test() {
	const [showUpload, setShowUpload] = useState(false);
	const { employee } = useTypedSelector((state) => state.employee);
	const dispatch = useDispatch();

	const handleUploadComplete = () => {
		setShowUpload(false);
	};

	const handleDeleteFile = (index: number) => {
		dispatch(removeEmployeeAttachment(index));
	};

	return (
		<div className="overflow-y-auto">
			<div className="flex items-center justify-between p-4 bg-[#E8F9F2] rounded-[12px] mb-4">
				<div className="flex items-center">
					<Image
						src={"/anaymouns.svg"}
						width={40}
						height={40}
						alt="pdf"
						className="ml-3"
					/>
					<div className="text-right flex flex-col gap-1">
						<div className="font-medium text-gray-900">{"رفع الملف"}</div>
					</div>
				</div>
				<div className="flex items-center">
					<Button
						variant="ghost"
						className="text-green-500 hover:text-green-500 hover:bg-transparent hover:underline"
						onClick={() => setShowUpload(true)}
					>
						رفع الملف
					</Button>
				</div>
			</div>

			{showUpload ? (
				<FileUpload closePopup={handleUploadComplete} />
			) : (
				<div className="divide-y flex flex-col gap-4 ">
					{(employee?.attachments || [])?.map((file: any, index: number) => {
						let UrlOfFile;
						if (typeof file === "string") {
							UrlOfFile = file;
						} else {
							UrlOfFile = URL.createObjectURL(file);
						}
						return (
							<div
								key={index}
								className="flex items-center justify-between p-4 bg-[#E8F9F2] rounded-[12px] cursor-pointer"
							>
								<Link
									href={UrlOfFile}
									target="_blank"
									className="flex items-center flex-1"
								>
									<Image
										src={"/pdf.svg"}
										width={40}
										height={40}
										alt="pdf"
										className="ml-3"
									/>
									<div className="text-right flex flex-col gap-1">
										<div className="font-medium text-gray-900">
											{file.name || "test"}
										</div>
										<div className="text-sm text-gray-500">
											{file.size} {file.size ? "byte" : ""}
										</div>
									</div>
								</Link>
								<div className="flex items-center">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
										onClick={() => handleDeleteFile(index)}
									>
										<Trash2 className="h-5 w-5" />
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
