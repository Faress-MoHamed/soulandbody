import {
  useAdditionPermission,
  AdditionPermissionType,
} from "../useAdditionPermission";
import { ColumnDef } from "@tanstack/react-table";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon } from "@/svgIcons/deleteIcon";
import toast from "react-hot-toast";
import AddPermissionTopComponent from "../../components/AddPermissionTopComponent";
import Link from "next/link";

export const useAdditionPermissionTable = () => {
  const { t } = useTypedTranslation();
  const { data: AdditionPermissionData, isLoading: AdditionPermissionLoading } =
    useAdditionPermission();

  const AdditionPermissionColumns: ColumnDef<AdditionPermissionType>[] = [
    {
      accessorKey: "supplier_id",
      header: t("inventory.additionPermission.supplier"),
    },
    {
      accessorKey: "invoice_number",
      header: t("inventory.additionPermission.invoiceNumber"),
    },
    {
      accessorKey: "quantity",
      header: t("inventory.additionPermission.quantity"),
    },
    {
      accessorKey: "invoice_date",
      header: t("inventory.classCard.date"),
    },
    {
      accessorKey: "discount",
      header: t("inventory.additionPermission.discount"),
    },
    {
      accessorKey: "invoice_attachment",
      header: t("inventory.additionPermission.paymentMethod"),
      cell: ({ row: { original } }: any) =>
        original?.invoice_attachment && (
          <Link
            href={original?.invoice_attachment}
            className=" rounded  flex justify-center"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2481_8632)">
                <path
                  d="M6.75 19.25H17.25M6.75 16.25H17.25M15.75 1.25001V6.50001C15.75 6.69893 15.829 6.88969 15.9697 7.03034C16.1103 7.171 16.3011 7.25001 16.5 7.25001H21.75M21.75 6.80001V23C21.75 23.1989 21.671 23.3897 21.5303 23.5303C21.3897 23.671 21.1989 23.75 21 23.75H3C2.80109 23.75 2.61032 23.671 2.46967 23.5303C2.32902 23.3897 2.25 23.1989 2.25 23V2.00001C2.25 1.8011 2.32902 1.61033 2.46967 1.46968C2.61032 1.32903 2.80109 1.25001 3 1.25001H16.275C16.3755 1.24943 16.4751 1.26904 16.5678 1.30769C16.6606 1.34634 16.7447 1.40324 16.815 1.47501L21.54 6.27501C21.6758 6.41591 21.7512 6.60432 21.75 6.80001Z"
                  stroke="black"
                  strokeLinecap="round"
                />
                <path
                  d="M17.25 11H6.75C6.33579 11 6 11.3358 6 11.75V13.25C6 13.6642 6.33579 14 6.75 14H17.25C17.6642 14 18 13.6642 18 13.25V11.75C18 11.3358 17.6642 11 17.25 11Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_2481_8632">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
        ),
    },
    {
      id: "actions",
      header: t("inventory.disbursementPermissions.actions"),
      cell: () => (
        <div className="flex justify-center gap-1">
          <Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
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
    label: t("inventory.additionPermission.title"),
    columns: AdditionPermissionColumns,
    data: AdditionPermissionData || [],
    loading: AdditionPermissionLoading,
    UserComponent: () => <AddPermissionTopComponent />,
  };
};
