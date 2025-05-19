import { useState } from "react";
import { useClassCardData } from "../useClassCard";
import { ColumnDef } from "@tanstack/react-table";
import { ClassCardType } from "../useClassCard";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import ClassCardTopComponent from "../../components/ClassCardTopComponent";

export const useClassCardTable = () => {
  const { t } = useTypedTranslation();
  const { data: ClassCardData, isLoading: ClassCardLoading } =
    useClassCardData();

  const ClassCardColumns: ColumnDef<ClassCardType>[] = [
    {
      accessorKey: "logged_date",
      header: t("inventory.classCard.date"),
    },
    {
      accessorKey: "code",
      header: t("inventory.classCard.code"),
    },
    {
      accessorKey: "incoming",
      header: t("inventory.classCard.incoming"),
    },
    {
      accessorKey: "outgoing",
      header: t("inventory.classCard.outgoing"),
    },
    {
      accessorKey: "balance",
      header: t("inventory.classCard.balance"),
    },
    {
      accessorKey: "description",
      header: t("inventory.classCard.description"),
    },
  ];

  return {
    label: t("inventory.classCard.title"),
    columns: ClassCardColumns,
    data: ClassCardData || [],
    loading: ClassCardLoading,
    UserComponent: () => <ClassCardTopComponent />,
  };
};
