import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/searchBar";
import AddButton from "@/components/AddButton";
import CustomPopUp from "@/components/popups";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { updateSupplierField } from "@/store/supplierSlice";
import AddQuote from "../AddQuote";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { updateSupplierField } from "../../supplier.slice";

export const SupplierForm = () => {
  const { t } = useTypedTranslation();
  const dispatch = useDispatch();
  const supplierData = useTypedSelector((state) => state.supplier);

  const handleFieldChange = (field: keyof typeof supplierData, value: string) => {
    dispatch(updateSupplierField({ field, value }));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 p-6">
        <div className="col-span-1">
          <CustomInput
            name="name"
            label={t("suppliers.supplierName")}
            value={supplierData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <CustomInput
            name="phone"
            label={t("suppliers.phone")}
            value={supplierData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <CustomInput
            name="address"
            label={t("suppliers.address")}
            value={supplierData.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
          />
        </div>
        <div className="col-span-1 flex items-end">
          <Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] py-[10px] px-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 rounded-lg">
            {t("suppliers.save")}
          </Button>
        </div>
      </div>
      <div className="border border-t border-[#D9d9d9]" />
      <div className="p-6 w-full flex md:flex-row md:gap-0 gap-5 flex-col justify-between md:items-end">
        <SearchBar />
        <CustomPopUp
          DialogTriggerComponent={() => (
            <AddButton
              AddTitle={t("suppliers.addOffer")}
              onClickAdd={() => { }}
            />
          )}
          DialogContentComponent={() => <AddQuote />}
        />
      </div>
    </div>
  );
};