import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CustomPopUp from "../popups";

interface DashboardCardProps {
	title: string;
	icon: string;
	href?: string;
	className?: string;
	DialogContentComponent?: any;
}

export function DashboardCard({
	title,
	icon,
	href,
	className,
	DialogContentComponent,
}: DashboardCardProps) {
	console.log(DialogContentComponent);
	return href ? (
		<Link
			href={href}
			className={cn(
				"flex  items-center justify-between p-6 bg-white rounded-lg lg:min-w-[435px] min-w-full h-[251px] shadow-sm hover:shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] transition-shadow duration-200 lg:max-w-[30%] max-w-full",
				className
			)}
		>
			<h1 className="text-[#042719] text-[26px] font-bold">{title}</h1>
			<div className="w-16 h-16 mb-4 relative">
				<Image
					src={icon || "/placeholder.svg"}
					alt={title}
					fill
					className="object-contain"
				/>
			</div>
		</Link>
	) : (
		<CustomPopUp
			DialogTriggerComponent={() => {
				return (
					<div
						className={cn(
							"flex  items-center justify-between p-6 bg-white rounded-lg  lg:w-[435px] w-full h-[251px] shadow-sm hover:shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] transition-shadow duration-200 ",
							className
						)}
					>
						<h1 className="text-[#042719] text-[26px] font-bold">{title}</h1>
						<div className="w-16 h-16 mb-4 relative">
							<Image
								src={icon || "/placeholder.svg"}
								alt={title}
								fill
								className="object-contain"
							/>
						</div>
					</div>
				);
			}}
			DialogContentclassName=""
			DialogContentComponent={({ closePopup }) => (
				<DialogContentComponent closePopup={closePopup} />
			)}
		/>
	);
}
