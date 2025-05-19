import { useMemo, useState } from "react";
import { useInventoryReports, InventoryItemType } from "../useInventoryReport";
import {
  useInventoryRecords,
  InventoryRecordType,
} from "../useInventoryRecord";
import { ColumnDef } from "@tanstack/react-table";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Trash2 } from "lucide-react";
import InventoryReportsTopComponent from "../../components/InventoryReportsTopComponent";
import { Input } from "@heroui/react";
import { useInventoryProductsData } from "../useInventoryProducts";
import CustomSelect from "@/components/customSelect";
import { updateActualQty, updateSelectedProduct } from "./productRowSlice";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
// import ProductRow from "./productRowInventoryTable";

export const useInventoryTable = () => {
  const { t } = useTypedTranslation();
  const [showinventoryDetails, setShowinventoryDetails] = useState(false);
  const [filters, setFilters] = useState({
    report_date: "",
    store_type_id: "",
    store_id: "",
    code: "", // if you're planning to use it
  });

  const { data: InventoryReportsData, isLoading: InventoryReportsLoading } =
    useInventoryReports();
  const { data: InventoryRecordsData, isLoading: InventoryRecordsLoading } =
    useInventoryRecords();
  const { data: productsStore, isLoading: productStoreIsloading } =
    useInventoryProductsData();
  const dispatch = useDispatch();

  const { actualQty, product: selectedProduct } = useTypedSelector(
    (s) => s.productRowSlice
  );
  console.log("selectedProduct", selectedProduct);

  const handleSelect = (value: string) => {
    console.log(
      "product",
      productsStore?.find(
        (el: { product_id: { toString: () => string } }) =>
          el?.product_id.toString() === value.toString()
      )
    );
    //   const product = || null;
    dispatch(
      updateSelectedProduct({
        product: productsStore?.find(
          (el: { product_id: string }) => el?.product_id === value
        ),
      })
    );
  };

  const handleQtyChange = (qty: number) => {
    dispatch(updateActualQty({ actualQty: qty }));
  };

  const remainingQty = useMemo(() => {
    if (!selectedProduct) return 0;
    return selectedProduct.qty - actualQty;
  }, [selectedProduct, actualQty]);

  const productOptions = (productsStore || [])?.map(
    (el: { product_name: any; product_id: any }) => ({
      label: el?.product_name,
      value: el?.product_id,
    })
  );
  const inventoryItemsData: InventoryItemType[] = (InventoryReportsData || [])
    .filter((report: any) => {
      // Apply filter logic for report-level fields
      const matchReportDate =
        !filters.report_date || report.report_date === filters.report_date;
      const matchStoreTypeId =
        !filters.store_type_id || report.store_type_id == filters.store_type_id;
      const matchStoreId =
        !filters.store_id || report.store_id == filters.store_id;

      return matchReportDate && matchStoreTypeId && matchStoreId;
    })
    .flatMap((report: any) => {
      console.log(report);
      // Filter item-level fields, like product_code
      return report.items.filter((item: any) => {
        const matchCode =
          !filters.code || item.product_code.includes(filters.code);
        return matchCode;
      });
    })
    .map((item: any) => ({
      product_code: item.product_code,
      product_name: item.product_name,
      store_quantity: item.store_quantity,
      actual_quantity: item.actual_quantity,
      difference: item.difference,
    }));

  const inventoryColumns: ColumnDef<InventoryItemType>[] = [
    {
      accessorKey: "product_code",
      header: t("inventory.inventoryReports.itemCode"),
    },
    {
      accessorKey: "product_name",
      header: t("inventory.inventoryReports.itemName"),
    },
    {
      accessorKey: "actual_quantity",
      header: t("inventory.inventoryReports.actualQuantity"),
    },
    {
      accessorKey: "store_quantity",
      header: t("inventory.inventoryReports.systemQuantity"),
    },
    {
      accessorKey: "difference",
      header: t("inventory.inventoryReports.difference"),
    },
  ];

  const inventoryRecordsColumns: ColumnDef<InventoryRecordType>[] = [
    {
      accessorKey: "product_code",
      header: t("inventory.inventoryReports.itemCode"),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "report_date",
      header: t("inventory.classCard.date"),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "store_name",
      header: t("inventory.warehouses.name"),
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: t("inventory.disbursementPermissions.actions"),
      cell: () => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 border-green-400"
          >
            <Eye className="w-4 h-4 mr-1" /> {t("inventory.actions.view")}
          </Button>
          <Button
            className="text-[#C41619] border-[#C41619]"
            variant="outline"
            size="sm"
          >
            <Trash2 className="w-4 h-4 mr-1" /> {t("inventory.actions.delete")}
          </Button>
        </div>
      ),
    },
  ];
  console.log(inventoryItemsData);
  return showinventoryDetails
    ? {
        columns: inventoryRecordsColumns as any,
        data: (InventoryRecordsData || []) as any,
        loading: InventoryRecordsLoading,
        title: t("inventory.inventoryReports.recordTitle"),
        withFilter: false,
        onClick: () => setShowinventoryDetails(false),
      }
    : {
        label: t("inventory.inventoryReports.title"),
        columns: inventoryColumns as any,
        data: inventoryItemsData || [],
        loading: InventoryReportsLoading,
        UserComponent: () => (
          <InventoryReportsTopComponent
            filters={filters}
            setFilters={setFilters}
            setShowinventoryDetails={setShowinventoryDetails}
          />
        ),
        withInlineAdd: true,
        withInlineAddContent: [
          {
            type: "custom",
            Component: (
              <Button
                className="flex items-center justify-center w-6 h-6 p-0 rounded-full bg-[#16C47F] text-white hover:bg-[#13B374]"
                //   onClick={onAdd}
              >
                <Plus size={16} />
              </Button>
            ),
          },
          {
            type: "custom",
            Component: <p>{selectedProduct?.product_code || "product_code"}</p>,
          },
          {
            type: "custom",
            Component: (
              <CustomSelect
                options={productOptions}
                onValueChange={handleSelect}
                value={selectedProduct?.product_id || ""}
              />
            ),
          },
          {
            type: "custom",
            Component: (
              <Input
                name="actual_quantity"
                type="number"
                min={0}
                value={actualQty.toString()}
                onChange={(e) => handleQtyChange(Number(e.target.value))}
              />
            ),
          },
          {
            type: "custom",
            Component: <p>{selectedProduct?.qty ?? "qty"}</p>,
          },
          {
            type: "custom",
            Component: <p>{remainingQty}</p>,
          },
        ] as any,
        onClick: () => setShowinventoryDetails(false),
      };
};
