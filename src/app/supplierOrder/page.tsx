import React from "react";
import PriceOfferTable from "../dashboard/user/suppliers/components/AddQuote/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className={cn("")}>
      <div
        // style={{
        // 	paddingInline: open ? 0 : "auto",
        // }}
        style={{
          maxWidth: "",
        }}
        className={cn(
          " lg:px-[80px] px-[20px] py-10 flex flex-col gap-[26px] "
        )}>
        <PriceOfferTable />

        <Button className="h-[56px] max-w-fit px-4">ارسال</Button>
      </div>
    </div>
  );
}
