"use client";
import { useTranslations } from "next-intl";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";
import { useWarehousesData } from "../hooks/usewarehouses";
import { useWareHouseType } from "../hooks/useWareHouseType";
import { useState } from "react";

function InventoryReportsTopComponent({
  setShowinventoryDetails,
  filters,
  setFilters,
}: {
  setShowinventoryDetails?: any;
  filters: any;
  setFilters?: any;
}) {


  const t = useTranslations("purshes.inventory");
  const { data: wareHouses, isLoading: wareHousesLoading } =
    useWarehousesData();
  const { data: WareHouseType, isLoading: WareHouseTypeLoading } =
    useWareHouseType();
  console.log(wareHouses);
  console.log(
    WareHouseType?.data?.map((el: any) => ({
      label: el?.type,
      value: el?.id?.toString(),
    }))
  );
  return (
    <div>
      <div className="flex flex-col md:gap-0 gap-5 px-6 pt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-bold">{t("title")}</h2>
          {/* <h2 className="text-[36px] font-[600]">S00026</h2> */}
        </div>
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1  gap-5">
          <CustomInput
            label={t("date")}
            type="date"
            value={filters.report_date}
            onChange={(e) =>
              setFilters({ ...filters, report_date: e.target.value })
            }
          />

          <CustomSelect
            label={t("code")}
            value={filters.code}
            options={[]} // Add real options if applicable
            onValueChange={(val) => setFilters({ ...filters, code: val })}
          />

          <CustomSelect
            label={t("type")}
            value={filters.store_type_id}
            options={WareHouseType?.data?.map((el: any) => ({
              label: el?.type,
              value: el?.id?.toString(),
            }))}
            onValueChange={(val) =>
              setFilters({ ...filters, store_type_id: val })
            }
            loading={WareHouseTypeLoading}
          />

          <CustomSelect
            label={t("name")}
            value={filters.store_id}
            options={wareHouses?.map((el: any) => ({
              label: el?.name,
              value: el?.id,
            }))}
            onValueChange={(val) => setFilters({ ...filters, store_id: val })}
            loading={wareHousesLoading}
          />
        </div>
        <Button
          onClick={() => console.log("Apply filters:", filters)}
          className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8"
        >
          {t("save")}
        </Button>
      </div>
      <div className="flex justify-end px-6 pb-6">
        <Button
          onClick={() => setShowinventoryDetails?.(true)}
          className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8"
        >
          {t("log")}
        </Button>
      </div>
    </div>
  );
}

export default InventoryReportsTopComponent;
