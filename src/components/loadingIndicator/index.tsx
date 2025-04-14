"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function LoadingIndicator({
	withFullScreen,
}: {
	withFullScreen?: boolean;
}) {
	return (
		<div
			className={cn(
				"flex justify-center items-center h-full",
				`${withFullScreen ? "min-h-screen" : ""}`
			)}
		>
			<motion.div
				className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
			/>
		</div>
	);
}
