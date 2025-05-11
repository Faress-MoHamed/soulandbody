"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useUserVacations } from "./hooks/useUserVacations";
import { CustomDatePicker } from "@/components/customDatePicker";
import CustomPopUp from "@/components/popups";
import AddCustomers from "@/app/dashboard/companies/Customers/components/AddCustomers";
import AddButton from "@/components/AddButton";
import { MonthPicker } from "@/components/monthPicker";
import type { WorkRecord } from "./vacations.type";
import RequestVacation from "./components/RequestVacationPopUp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
function StatusCard({
  type,
}: {
  type: "pending" | "accepted" | "done" | "denied";
}) {
  const t = useTranslations("userHr.statuses");

  const typeBgColor: Record<typeof type, string> = {
    pending: "#FFF5C5",
    accepted: "#8DFB90",
    denied: "#FFDCDC",
    done: "#DCD2FF",
  };

  const typeTextColor: Record<typeof type, string> = {
    pending: "#E27D00",
    accepted: "#04910C",
    denied: "#FF0000",
    done: "#7F27FF",
  };

  const sharedClasses =
    "w-[150px] py-1.5 px-2 h-[30px] rounded-[10px] font-[500] text-[12px]";

  const content = (
    <div
      style={{
        background: typeBgColor[type],
        color: typeTextColor[type],
      }}
      className={`${sharedClasses} `}>
      {t(type)}
    </div>
  );

  return content;
}
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default function ExecusesPage() {
  const { data: userVacationsData, isLoading: userVacationsLoading } =
    useUserVacations();
  const t = useTranslations("userHr.vacationsPage");

  const columns: ColumnDef<any>[] = [
    {
      header: t("date"),
      accessorKey: "updated_at",
	  cell: ({ row: { original } }) => {
        return formatDate(original?.updated_at);
      },
    },
    {
      header: t("from"),
      accessorKey: "vacation_start_date",
	  cell: ({ row: { original } }) => {
        return formatDate(original?.vacation_start_date);
      },
    },
    {
      header: t("to"),
      accessorKey: "return_date",
      cell: ({ row: { original } }) => {
        return formatDate(original?.return_date);
      },
    },
    {
      header: t("vacationType"),
      accessorKey: "vacation_type",
      cell: ({ row }: any) => {
        const vacation = row.original.vacation_type;
        const balance = row.original.balanceType;

        if (!vacation) return "-";

        return (
          <div className="min-w-full text-nowrap">
            <span className="font-[400] text-[16px]">{vacation}</span>

          </div>
        );
      },
    },
    {
      header: t("deduction"),
      accessorKey: "deduction",
      cell: ({ row: { original } }) => {
        return <>{original.deduction || 0}</>;
      },
    },
    {
      header: t("status"),
      accessorKey: "status",
      cell: ({ row }: any) => {
        const status = row.original.status;
        return (
          <div className="flex justify-center">
            <StatusCard type={status || t("pending")} />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ReusableManyTable
        dataSets={[
          {
            columns,
            data: userVacationsData || [],
            loading: userVacationsLoading,
            withPrinter: true,
            containerClassName: "border-none",
            title: t("recordTitle"),
            withFilter: false,
            UserComponent: () => (
              <div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
                <MonthPicker
                  label={t("monthPickerLabel")}
                  className="w-[302px] h-[48px] bg-white"
                />
                <div className="flex gap-2 items-center">
                  <CustomPopUp
                    DialogTriggerComponent={() => (
                      <div className="text-end flex justify-between">
                        <AddButton
                          AddTitle={t("requestVacation")}
                          onClickAdd={() => {}}
                        />
                      </div>
                    )}
                    DialogContentComponent={() => <RequestVacation />}
                  />
                  <Link
                    href={"vacations/vacationsList"}
                    className="flex justify-center items-center border border-[#16C47F] px-3 py-2.5 w-[117px] h-[44px] self-end text-[#16C47F] rounded-[8px]">
                    {t("recordButton")}
                  </Link>
                </div>
              </div>
            ),
          },
        ]}
        withTopPrinter={false}
      />
    </div>
  );
}
