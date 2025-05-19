import { useState } from "react";
import {
  useDisbursementPermissionsData,
  DisbursementPermissionType,
  useDeleteDisbursementPermissionsData,
} from "../useDisbursementPermission";
import {
  useWarehouseTransferData,
  WarehouseTransferType,
} from "../useWarehouseTransfer";
import { ColumnDef } from "@tanstack/react-table";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Button } from "@/components/ui/button";
import { DeleteIcon } from "@/svgIcons/deleteIcon";
import toast from "react-hot-toast";

export const useDisbursementTable = () => {
  const { t } = useTypedTranslation();
  const [
    showDisbursementPermissionsDetails,
    setShowDisbursementPermissionsDetails,
  ] = useState(false);

  const {
    data: DisbursementPermissionsData,
    isLoading: DisbursementPermissionsLoading,
  } = useDisbursementPermissionsData();
  const {
    mutate: deleteDisbursementPermissionsData,
    isPending: deleteDisbursementPermissionsLoading,
  } = useDeleteDisbursementPermissionsData();

  const DisbursementPermissionsColumns: ColumnDef<DisbursementPermissionType>[] =
    [
      {
        accessorKey: "code",
        header: t("inventory.disbursementPermissions.code"),
      },
      {
        accessorKey: "updated_at",
        header: t("inventory.classCard.date"),
      },
      {
        accessorKey: "product_name",
        header: t("inventory.disbursementPermissions.name"),
      },
      {
        accessorKey: "issued_quantity",
        header: t("inventory.disbursementPermissions.quantity"),
      },
      {
        accessorKey: "notes",
        header: t("inventory.disbursementPermissions.reason"),
      },
      {
        id: "actions",
        header: t("inventory.disbursementPermissions.actions"),
        cell: ({
          row: {
            original: { id },
          },
        }) => (
          <div className="flex justify-center gap-1">
            <Button
              disabled={deleteDisbursementPermissionsLoading}
              onClick={async () => {
                try {
                  await deleteDisbursementPermissionsData(id, {
                    onSuccess: (e) => {
                      toast.success("تم حذف الصلاحية بنجاح");
                    },
                    onError: (e) => {
                      toast.error("عذرا تعذر حذف الصلاحية");
                    },
                  });
                } catch (error) {}
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]"
            >
              <>
                <DeleteIcon />
                {t("inventory.actions.delete")}
              </>
            </Button>
          </div>
        ),
      },
    ];
  const { data: WarehouseTransferData, isLoading: WarehouseTransferLoading } =
    useWarehouseTransferData();
  const warehouseTransferColumns: ColumnDef<WarehouseTransferType>[] = [
    {
      accessorKey: "code",
      header: t("inventory.warehouseTransfer.code"),
    },
    {
      accessorKey: "date",
      header: t("inventory.classCard.date"),
    },
    {
      accessorKey: "store_from_name",
      header: t("inventory.warehouseTransfer.sourceWarehouse"),
    },
    {
      accessorKey: "store_to_name",
      header: t("inventory.warehouseTransfer.destinationWarehouse"),
    },
    // {
    //   id: "actions",
    //   header: t("inventory.disbursementPermissions.actions"),
    //   cell: () => (
    //     <div className="flex gap-2 justify-center">
    //       {/* <Button
    //         variant="outline"
    //         size="sm"
    //         className="text-green-600 border-green-400">
    //         <Eye className="w-4 h-4 mr-1" /> {t("inventory.actions.view")}
    //       </Button> */}
    //       <Button
    //         className="text-[#C41619] border-[#C41619]"
    //         variant="outline"
    //         size="sm">
    //         <Trash2 className="w-4 h-4 mr-1" /> {t("inventory.actions.delete")}
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  return showDisbursementPermissionsDetails
    ? {
        columns: warehouseTransferColumns,
        data: WarehouseTransferData || [],
        loading: WarehouseTransferLoading,
        title: t("inventory.disbursementPermissions.title"),
        withFilter: false,
        onClick: () => setShowDisbursementPermissionsDetails(false),
      }
    : {
        label: t("inventory.disbursementPermissions.title"),
        columns: DisbursementPermissionsColumns,
        data: DisbursementPermissionsData || [],
        loading: DisbursementPermissionsLoading,
        UserComponent: () => (
          <DisbursementPermissionsTopComponent
            setShowDisbursementPermissionsDetails={
              setShowDisbursementPermissionsDetails
            }
          />
        ),
        onClick: () => setShowDisbursementPermissionsDetails(false),
      };
};
import DisbursementPermissionsTopComponent from "../../components/DisbursementPermissionsTopComponent";
