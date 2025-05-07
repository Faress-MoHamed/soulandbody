"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle login logic here
		console.log({ email, password });
	};

	return (
		<Card className="w-full max-w-md overflow-hidden">
			<CardContent className="p-6">
				<div className="flex flex-col items-center space-y-6">
					<div className="relative h-20 w-20">
						<Image
							src="/logo.png"
							alt="Logo"
							fill
							className="object-contain"
							priority
						/>
					</div>

					<div className="text-center">
						<h1 className="text-xl font-semibold">مرحبا بعودتك</h1>
						<p className="text-sm text-muted-foreground">
							تم تسجيل الدخول للتحكم في شركتك بنظام
						</p>
					</div>

					<form onSubmit={handleSubmit} className="w-full space-y-4">
						<Input
							type="email"
							placeholder="get@storitutorial.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="text-start"
						/>

						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="text-start"
						/>

						<Button
							type="submit"
							className="w-full bg-emerald-500 hover:bg-emerald-600"
						>
							تسجيل الدخول
						</Button>
					</form>
				</div>
			</CardContent>
		</Card>
	);
}
