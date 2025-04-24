import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-12 bg-white">
			<div className="flex flex-col items-center max-w-md text-center">
				<div className="relative w-64 h-64 mb-8">
					<Image
						src="/not-found.png"
						alt="Page not found"
						fill
						className="object-contain"
						priority
					/>
				</div>
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
					Page not found
				</h1>
				<p className="mb-8 text-base text-gray-600">
					Sorry, we couldn't find the page you're looking for.
				</p>
				<Button asChild className="bg-[#16C47F] hover:bg-[#13A66C] text-white">
					<Link href="/" className="flex items-center gap-2">
						<Home className="w-4 h-4" />
						Back to Home
					</Link>
				</Button>
			</div>
		</div>
	);
}
