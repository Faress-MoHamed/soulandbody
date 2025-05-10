import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import AddNewSupplier from "../AddNewSupplier";

export const AddSupplierButton = () => {
  const { t } = useTypedTranslation();
  
  return (
    <CustomPopUp
      DialogTriggerComponent={() => (
        <AddButton
          AddTitle={t("suppliers.addSupplier")}
          onClickAdd={() => { }}
        />
      )}
      DialogContentComponent={() => <AddNewSupplier />}
    />
  );
};