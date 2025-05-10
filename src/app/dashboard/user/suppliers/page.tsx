"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useAmountsDues, type AmountsDuesType } from "./hooks/useAmountsDues";
import type { ColumnDef } from "@tanstack/react-table";
import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import { useDeleteQuotations } from "./hooks/useQuotations";
import { useEffect, useState, useMemo } from "react";
import CustomInput from "@/components/customInput";
import { invoicesTypee, QuotationTypee, useDeleteSupplier, useSuppliers, type SuppliersType } from "./hooks/useSuppliers";
import AddNewSupplier from "./components/AddNewSupplier";
import { useTypes } from "./hooks/useTypesSup";
import AddQuote from "./components/AddQuote";
import ShowOffers from "./components/productDetailsPopUp";
import ShowIcon from "@/iconsSvg/Show";
import DeleteIcon from "@/iconsSvg/DeleteIcon";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { AddSuppliersType } from "./hooks/useTypesSup";
import { useAddSupplierType, useUpdateSupplierType } from "./hooks/useTypesSup";
import { Toaster, toast } from 'react-hot-toast';
import InvoiceDetails from "@/app/test/components/InvoiceDetails";
import { useDeleteSupplierType } from "./hooks/useTypesSup";
import { useSupplierById } from "./hooks/useSuppliers";
import InterStateCompAdd from "./components/addNewSupplierType";
import AddNewSupplierType from "./components/addNewSupplierType";
import { SupplierForm } from "./components/SupplierForm";
import { SupplierSearch } from "./components/SupplierSearch";
import { AddSupplierButton } from "./components/AddSupplierButton";
import { useDispatch } from "react-redux";
import { setSupplierData } from "./supplier.slice";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export default function Page() {
  const { mutate: deleteSupplierType } = useDeleteSupplierType();
  const { mutate: deleteSupplier, isError, isSuccess } = useDeleteSupplier();
  const { mutate: deleteQuototion } = useDeleteQuotations();
  const { t } = useTypedTranslation();
  const [ShowOrders, setShowOrders] = useState("");
  const { data: AmountDuesData, isLoading: AmountDuesLoading } = useAmountsDues();
  const { data: SuppliersData, isLoading: SuppliersLoading } = useSuppliers();
  const { data: types, isLoading: typesLoading, error } = useTypes();
  const { data: supplierByIdData, isLoading: supplierDataLoading } = useSupplierById(ShowOrders);
//   const [supplierData, setSupplierData] = useState<any>({
//     id: null,
//     name: "",
//     phone: "",
//     address: "",
//     invoices: [],
//     quotations: [],
//   });

  const dispatch = useDispatch();
	const supplierData=useTypedSelector(s=>s.supplier)
  // Update your useEffect to use Redux
  useEffect(() => {
	if (supplierByIdData) {
	  dispatch(setSupplierData(supplierByIdData));
	}
  }, [supplierByIdData, dispatch]);

  const AmountDuesColumns = useMemo<ColumnDef<AmountsDuesType>[]>(() => [
    {
      header: t("suppliers.supplierName"),
      accessorKey: "name",
    },
    {
      header: t("suppliers.remainingAmount"),
      accessorKey: "total_outstanding",
    },
  ], [t]);

  const AddSupplierCol = useMemo<ColumnDef<AddSuppliersType>[]>(() => [
    {
      header: "النوع",
      accessorKey: "type",
      cell: ({ row }) => {
        const type = row.original;
        return (
          <div className="flex justify-center gap-2">
            <span className="px-2 py-1 rounded">{type.type}</span>
          </div>
        );
      },
    },
    {
      header: t("suppliers.actions"),
      cell: ({ row }) => {
        const type = row.original;
        return (
          <div className="flex flex-row-reverse justify-center gap-1">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
              onClick={() => {
                const confirmDelete = window.confirm("هل أنت متأكد أنك تريد الحذف؟");
                if (confirmDelete) {
                  deleteSupplierType({ id: type.id });
                }
              }}
            >
              {t("suppliers.delete")}
              <DeleteIcon />
            </Button>
            <CustomPopUp
              DialogTriggerComponent={() => (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F] text-sm"
                >
                  تعديل
                </Button>
              )}
              DialogContentComponent={({ closePopup }) => (
                <AddNewSupplierType type={type} closePopup={closePopup} />
              )}
            />
          </div>
        );
      },
    }
  ], [t, deleteSupplierType]);

  const offersColumns = useMemo<ColumnDef<QuotationTypee>[]>(() => [
    {
      header: "رقم العرض",
      cell: ({ row }) => {
        const offer = row.original;
        return (
          <div className="flex justify-center gap-2">
            <span className="px-2 py-1 rounded">{offer.id}</span>
          </div>
        );
      },
    },
    {
      header: t("suppliers.offerDescription"),
      cell: ({ row }) => {
        const offer = row.original;
        return (
          <div className="flex justify-center gap-2">
            <span className="px-2 py-1 rounded">{offer.description}</span>
          </div>
        );
      },
    },
    {
      header: t("suppliers.date"),
      cell: ({ row }) => {
        const offer = row.original;
        return (
          <div className="flex justify-center gap-2">
            <span className="px-2 py-1 rounded">{offer.date}</span>
          </div>
        );
      },
    },
    {
      header: t("suppliers.actions"),
      cell: ({ row }) => {
        const offer = row.original;
        return (
          <div className="flex justify-center gap-2">
            <CustomPopUp
              DialogTriggerComponent={() => (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
                >
                  <ShowIcon />
                  {t("suppliers.show")}
                </Button>
              )}
              DialogContentComponent={() => <ShowOffers QuotaionId={offer.id} />}
            />
            <Button
              onClick={() => deleteQuototion({ id: offer.id })}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
            >
              <DeleteIcon />
              {t("suppliers.delete")}
            </Button>
          </div>
        );
      },
    },
  ], [t, deleteQuototion]);

  const InvoiceColumns = useMemo<ColumnDef<invoicesTypee>[]>(() => [
    {
      header: t("suppliers.invoiceNumber"),
      accessorKey: "invoice_no",
      cell: ({ row }) => (
        <div className="text-center">{row.original.invoice_no || '---'}</div>
      ),
    },
    {
      header: t("suppliers.date"),
      accessorKey: "date",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.date ? new Date(row.original.date).toLocaleDateString('ar-EG') : '---'}
        </div>
      ),
    },
    {
      header: t("suppliers.totalAmount"),
      accessorKey: "total_amount",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.total_amount ?
            Number(row.original.total_amount).toLocaleString('ar-EG') + ' ج.م' :
            '---'}
        </div>
      ),
    },
    {
      header: t("suppliers.remainingAmount"),
      accessorKey: "outstanding",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.outstanding ?
            Number(row.original.outstanding).toLocaleString('ar-EG') + ' ج.م' :
            '---'}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: t("suppliers.actions"),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <CustomPopUp
            DialogTriggerComponent={() => (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
              >
                <ShowIcon />
                {t("suppliers.show")}
              </Button>
            )}
            DialogContentComponent={() => (
              <InvoiceDetails invoiceId={row.original.id} />
            )}
          />
        </div>
      ),
    },
  ], [t]);

  const supplierColumns = useMemo<ColumnDef<SuppliersType>[]>(() => [
    {
      header: t("suppliers.supplierName"),
      accessorKey: "name",
    },
    {
      header: t("suppliers.phone"),
      accessorKey: "phone",
    },
    {
      header: t("suppliers.address"),
      accessorKey: "address",
    },
    {
      header: t("suppliers.supplierType"),
      accessorKey: "supplierType",
    },
    {
      header: t("suppliers.actions"),
      cell: ({ row }) => {
        const supplier = row.original;
        return (
          <div className="flex flex-row-reverse justify-center gap-1">
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
              onClick={() => {
                const confirmDelete = window.confirm("هل أنت متأكد أنك تريد الحذف؟");
                if (confirmDelete) { deleteSupplier({ id: supplier.id }) }
              }}
            >
              {t("suppliers.delete")}
              <DeleteIcon />
            </Button>
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
              onClick={() => setShowOrders(supplier.id.toString())}
            >
              <ShowIcon />
              {t("suppliers.show")}
            </Button>
          </div>
        );
      },
    },
  ], [t, deleteSupplier]);

  const dataSets = useMemo(() => [
    {
      data: types?.filter(el => !el?.deleted_at) || [],
      columns: AddSupplierCol,
      withFilter: false,
      loading: typesLoading,
      label: t("suppliers.addTypeSupplier"),
      UserComponent: () => (
        <div className="flex flex-col gap-5 p-6">
          <h2 className="text-[26px] font-bold">{t("suppliers.addTypeSupplier")}</h2>
          <div className="flex justify-between">
            <SearchBar />
            <CustomPopUp
              DialogTriggerComponent={() => (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:opacity-85 h-[38px] w-[160px] rounded-[8px] border border-[#16C47F] text-sm"
                >
                  اضافة نوع مورد جديد
                </Button>
              )}
              DialogContentComponent={({ closePopup }) => (
                <InterStateCompAdd closePopup={closePopup} />
              )}
            />
          </div>
        </div>
      ),
    },
    {
      data: ShowOrders ? supplierData.quotations || [] : SuppliersData || [],
      loading: ShowOrders ? supplierDataLoading : SuppliersLoading,
      columns: ShowOrders ? offersColumns : supplierColumns,
      withFilter: false,
      title: ShowOrders ? t("suppliers.addOffer") : t("suppliers.title"),
      label: t("suppliers.title"),
	  UserComponent: ShowOrders ? SupplierForm : SupplierSearch,
	  ButtonTrigger: ShowOrders ? () => <></> : AddSupplierButton,
      onClick: () => setShowOrders(''),
      nestedTable: ShowOrders
        ? [{
          title: t("suppliers.invoices"),
          data: supplierData.invoices || [],
          columns: InvoiceColumns,
        }]
        : undefined,
    },
    {
      data: AmountDuesData || [],
      loading: AmountDuesLoading,
      columns: AmountDuesColumns,
      withFilter: false,
      label: t("suppliers.amountDue"),
      UserComponent: () => (
        <div className="flex flex-col gap-5 p-6">
          <h2 className="text-[26px] font-bold">{t("suppliers.amountDue")}</h2>
          <SearchBar />
        </div>
      ),
    },
  ], [
    types,
    AddSupplierCol,
    typesLoading,
    t,
    ShowOrders,
    supplierData,
    SuppliersData,
    supplierDataLoading,
    SuppliersLoading,
    offersColumns,
    supplierColumns,
    AmountDuesData,
    AmountDuesLoading,
    AmountDuesColumns,
    InvoiceColumns
  ]);

  return <ReusableManyTable dataSets={dataSets} />;
}