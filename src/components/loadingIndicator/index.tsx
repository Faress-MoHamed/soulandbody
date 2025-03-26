"use client";

import { motion } from "framer-motion";

export default function LoadingIndicator() {
	return (
		<div className="flex justify-center items-center h-full">
			<motion.div
				className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
			/>
		</div>
	);
}
