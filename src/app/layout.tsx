import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ReactQueryProvider from "@/providers/reactQuertProvider";
import HeroUiProvider from "@/providers/HerouiProvider";
import { CustomDatePicker } from "@/components/customDatePicker";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import NextIntlProvider from "@/providers/NextIntlProvider";
import { NextIntlClientProvider } from "next-intl";
import RootLocaleLayout from "@/providers/NextIntlProvider";

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const t = await getTranslations();
	return (
		<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				suppressHydrationWarning
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fafafa]`}
			>
				<RootLocaleLayout>
					<ReactQueryProvider>
						<HeroUiProvider>
							<div className=" lg:px-[80px] px-[20px] py-10 flex flex-col gap-[26px] ">
								<Header />
								{children}
							</div>
						</HeroUiProvider>
					</ReactQueryProvider>
				</RootLocaleLayout>
			</body>
		</html>
	);
}
