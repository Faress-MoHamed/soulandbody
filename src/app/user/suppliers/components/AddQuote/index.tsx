import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PriceOfferTable from "./table";
export default function AddQuote() {
  return (
		<Card className="flex flex-col px-6 py-9 pt-0 gap-6 md:max-w-full max-w-[100%] h-fit">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					اضافة عرض الأسعار
				</CardTitle>
			</CardHeader>
			<CardContent className="">
				<PriceOfferTable />
			</CardContent>
		</Card>
	);
}
