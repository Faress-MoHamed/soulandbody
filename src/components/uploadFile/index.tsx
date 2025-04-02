"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Upload, Check, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import FileUploadList from "../file-upload-list";
// import type { FileItem } from "@/app/test/page";
import CustomPopUp from "../popups";
import CustomCard from "../customCard";

type UploadState = "idle" | "uploading" | "success";

export function FileUpload() {
	const [uploadState, setUploadState] = useState<UploadState>("idle");
	const [progress, setProgress] = useState(0);
	const [fileName, setFileName] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

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
					return 100;
				}
				return newProgress;
			});
		}, 10);
	};

	const resetUpload = () => {
		setUploadState("idle");
		setProgress(0);
		setFileName("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
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
	const [files, setFiles] = useState<
		{
			id: string;
			name: string;
			size: string;
			type: string;
		}[]
	>([
		{ id: "1", name: "صورة شخصية", size: "5.34KB", type: "image" },
		{ id: "2", name: "ملف جنائي", size: "5.34KB", type: "document" },
		{ id: "3", name: "كشف العميل", size: "5.34KB", type: "document" },
		{ id: "4", name: "ترخيص المهني", size: "5.34KB", type: "document" },
		{ id: "5", name: "شهادات الخبرة", size: "5.34KB", type: "document" },
		{ id: "6", name: "رقم البطاقة", size: "5.34KB", type: "document" },
		{ id: "7", name: "شهادة الميلاد", size: "5.34KB", type: "document" },
		{ id: "8", name: "السيرة الذاتية", size: "5.34KB", type: "document" },
	]);

	const handleDeleteFile = (id: string) => {
		setFiles(files.filter((file) => file.id !== id));
	};
	return (
		<div className="">
			<div className="flex items-center justify-between p-4 bg-[#E8F9F2] rounded-[12px] mb-4">
				{" "}
				<div className="flex items-center">
					<Image
						src={"/anaymouns.svg"}
						width={40}
						height={40}
						alt="pdf"
						className="ml-3"
					/>
					<div className="text-right flex flex-col gap-1">
						<div className="font-medium text-gray-900">{"شهادة التخرج"}</div>
					</div>
				</div>
				<div className="flex items-center">
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								variant="ghost"
								// onClick={handleAddFile}
								className="text-green-500 hover:text-green-500  hover:bg-transparent hover:underline"
								// onClick={() => onDelete(file.id)}
							>
								رفع الملف
							</Button>
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
				</div>
			</div>
			{/* <div className="p-4 border-b flex justify-between items-center">
							<h2 className="text-lg font-semibold">رفع الملف</h2>
							<div className="flex rtl">
								<Button
									onClick={handleAddFile}
									className="bg-emerald-600 hover:bg-emerald-700 "
								>
									تصفح للملفات
								</Button>
							</div>
						</div> */}
			<FileUploadList files={files} onDelete={handleDeleteFile} />
		</div>
	);
}
// "use client";

// import type React from "react";

// import { useState, useRef } from "react";
// import { Upload } from "lucide-react";

// export default function FileUpload() {
// 	const [file, setFile] = useState<File | null>(null);
// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files[0]) {
// 			setFile(e.target.files[0]);
// 		}
// 	};

// 	const handleDrop = (e: React.DragEvent) => {
// 		e.preventDefault();
// 		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// 			setFile(e.dataTransfer.files[0]);
// 		}
// 	};

// 	const handleDragOver = (e: React.DragEvent) => {
// 		e.preventDefault();
// 	};

// 	const handleClick = () => {
// 		fileInputRef.current?.click();
// 	};

// 	return (
// 		<div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
// 			<div className="flex items-center justify-between mb-6">
// 				<h1 className="text-xl font-semibold text-right">
// 					رفع ملف شهادة التخرج
// 				</h1>
// 				<button className="text-gray-500">
// 					<svg
// 						xmlns="http://www.w3.org/2000/svg"
// 						width="24"
// 						height="24"
// 						viewBox="0 0 24 24"
// 						fill="none"
// 						stroke="currentColor"
// 						strokeWidth="2"
// 						strokeLinecap="round"
// 						strokeLinejoin="round"
// 					>
// 						<line x1="18" y1="6" x2="6" y2="18"></line>
// 						<line x1="6" y1="6" x2="18" y2="18"></line>
// 					</svg>
// 				</button>
// 			</div>

// 			<div
// 				className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer"
// 				onClick={handleClick}
// 				onDrop={handleDrop}
// 				onDragOver={handleDragOver}
// 			>
// 				<div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
// 					<Upload className="w-8 h-8 text-[#16C47F]" />
// 				</div>

// 				<p className="text-center mb-2">
// 					<span>ارفع ملفاتك هنا</span>{" "}
// 					<span className="text-[#16C47F]">أو اضغط للرفع</span>
// 				</p>

// 				<p className="text-sm text-gray-400">
// 					SVG, PNG, JPG or GIF (max. 800x400px)
// 				</p>

// 				<input
// 					type="file"
// 					className="hidden"
// 					ref={fileInputRef}
// 					onChange={handleFileChange}
// 					accept=".svg,.png,.jpg,.jpeg,.gif"
// 				/>

// 				{file && <div className="mt-4 text-sm text-green-600">{file.name}</div>}
// 			</div>
// 		</div>
// 	);
