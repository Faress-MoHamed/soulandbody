import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" dir="rtl">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</head>

			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="container  md:px-[80px] px-[20px] py-10 flex flex-col gap-[26px]">
					<Header />
					{children}
				</div>
			</body>
		</html>
	);
}
