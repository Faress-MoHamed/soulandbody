import {
  useInventoryProductsData,
  InventoryProductsType,
  useDeleteInventoryProductsData,
} from "../useInventoryProducts";
import { ColumnDef } from "@tanstack/react-table";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon } from "@/svgIcons/deleteIcon";
import toast from "react-hot-toast";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import AddNewProduct from "../../components/AddNewProduct/AddNewProduct";

export const useInventoryProductsTable = () => {
  const { t } = useTypedTranslation();
  const { data: InventoryProductsData, isLoading: InventoryProductsLoading } =
    useInventoryProductsData();
  const deleteProduct = useDeleteInventoryProductsData();

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("messages.success.delete");
    } catch (error) {
      toast.error("messages.error.delete");
    }
  };

  const productColumns: ColumnDef<InventoryProductsType>[] = [
    {
      accessorKey: "product_code",
      header: t("inventory.products.productCode"),
    },
    {
      accessorKey: "product_name",
      header: t("inventory.products.productName"),
    },
    {
      accessorKey: "product_category",
      header: t("inventory.products.category"),
    },
    { accessorKey: "measure_unit", header: t("inventory.products.unit") },
    { accessorKey: "updated_at", header: t("inventory.classCard.date") },
    {
      accessorKey: "product_purchase_price",
      header: t("inventory.products.purchasePrice"),
    },
    {
      accessorKey: "product_sell_price",
      header: t("inventory.products.sellingPrice"),
    },
    {
      accessorKey: "supplier_name",
      header: t("inventory.products.mainSupplier"),
    },
    { accessorKey: "minLimit", header: t("inventory.products.minLimit") },
    { accessorKey: "maxLimit", header: t("inventory.products.maxLimit") },
    {
      id: "actions",
      header: t("inventory.disbursementPermissions.actions"),
      cell: ({ row: { original } }: any) => (
        <div className="flex justify-center gap-1">
          <Button
            onClick={() => {
              handleDelete(original?.id);
            }}
            disabled={deleteProduct.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]"
          >
            <>
              <DeleteIcon />
              {t("inventory.actions.delete")}
            </>
          </Button>
          <Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#16C47F]">
            <EditIcon />
            {t("inventory.actions.edit")}
          </Button>
        </div>
      ),
    },
  ];

  return {
    data: InventoryProductsData || [],
    columns: productColumns,
    loading: InventoryProductsLoading,
    ButtonTrigger: () => {
      return (
        <CustomPopUp
          DialogTriggerComponent={() => {
            return (
              <AddButton
                AddTitle={t("inventory.products.newProduct")}
                onClickAdd={() => {}}
              />
            );
          }}
          DialogContentComponent={() => <AddNewProduct />}
        />
      );
    },
    label: "الاصناف",
  };
};
