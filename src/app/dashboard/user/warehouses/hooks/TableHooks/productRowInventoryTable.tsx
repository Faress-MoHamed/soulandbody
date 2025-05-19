import { useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import CustomSelect from "@/components/customSelect";
import { useDispatch } from "react-redux";
import { updateActualQty, updateSelectedProduct } from "./productRowSlice";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useInventoryProductsData } from "../useInventoryProducts";

interface ProductRowProps {
  productsStore: any[];
  onAdd?: () => void;
}

export const ProductRow = () => {
  const { data: productsStore, isLoading: productStoreIsloading } =
    useInventoryProductsData();
  const dispatch = useDispatch();

  const { actualQty, product: selectedProduct } = useTypedSelector(
    (s) => s.productRowSlice
  );
  console.log("selectedProduct", selectedProduct);
  useEffect(() => {
    console.log("selectedProduct", selectedProduct);
  }, [selectedProduct]);
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

  return [
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
          value={actualQty}
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
  ];
};

