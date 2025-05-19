// "use client";
// import React, { useState } from "react";
// import {
// 	useInventoryReports,
// 	type InventoryItemType,
// } from "./hooks/useInventoryReport";
// import type { ColumnDef } from "@tanstack/react-table";
// import ReusableManyTable from "@/components/ReusableTableWithManyData";
// import InventoryReportsTopComponent from "./components/InventoryReportsTopComponent";
// import { Eye, Trash2, Pencil, FileText } from "lucide-react";
// import {
// 	useInventoryRecords,
// 	type InventoryRecordType,
// } from "./hooks/useInventoryRecord";
// import { Button } from "@/components/ui/button";
// import {
//   useDeleteInventoryProductsData,
//   useInventoryProductsData,
//   type InventoryProductsType,
// } from "./hooks/useInventoryProducts";
// import { DeleteIcon, EditIcon } from "@/svgIcons/deleteIcon";
// import CustomPopUp from "@/components/popups";
// import AddButton from "@/components/AddButton";
// import SearchBar from "@/components/searchBar";
// import AddNewProduct from "./components/AddNewProduct/AddNewProduct";
// import {
//   useDeleteWareHouse,
//   useWarehousesData,
//   type WarehouseType,
// } from "./hooks/usewarehouses";
// import { useClassCardData, type ClassCardType } from "./hooks/useClassCard";
// import ClassCardTopComponent from "./components/ClassCardTopComponent";
// import {
// 	useDeleteDisbursementPermissionsData,
//   useDisbursementPermissionsData,
//   type DisbursementPermissionType,
// } from "./hooks/useDisbursementPermission";
// import DisbursementPermissionsTopComponent from "./components/DisbursementPermissionsTopComponent";
// import {
//   useWarehouseTransferData,
//   type WarehouseTransferType,
// } from "./hooks/useWarehouseTransfer";
// import {
//   useAdditionPermission,
//   type AdditionPermissionType,
// } from "./hooks/useAdditionPermission";
// import { useTypedTranslation } from "@/hooks/useTypedTranslation";
// import AddNewWareHouse from "./components/AddNewWareHouse/AddNewWareHouse";
// import MaxCapacityTable from "./components/MaxCapacityTable";
// import { useSubWarehousesData } from "./hooks/useSubWareHouses";
// import AddNewSubWareHouse from "./components/AddNewSubWareHouse";
// import AddPermissionTopComponent from "./components/AddPermissionTopComponent";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { useClassCardTable } from './hooks/useClassCardTable';
// import { useInventoryTable } from './hooks/useInventoryTable';
// import { useDisbursementTable } from './hooks/useDisbursementTable';
// import { useAdditionPermissionTable } from './hooks/useAdditionPermissionTable';
// import { useInventoryProductsTable } from './hooks/useInventoryProductsTable';

// export default function page() {
//   const { t } = useTypedTranslation();
//   const [showinventoryDetails, setShowinventoryDetails] = useState(false);

//   const { data: InventoryReportsData, isLoading: InventoryReportsLoading } =
//     useInventoryReports();

//   const inventoryColumns: ColumnDef<InventoryItemType>[] = [
//     {
//       accessorKey: "itemCode",
//       header: t("inventory.inventoryReports.itemCode"),
//     },
//     {
//       accessorKey: "itemName",
//       header: t("inventory.inventoryReports.itemName"),
//     },
//     {
//       accessorKey: "actualQuantity",
//       header: t("inventory.inventoryReports.actualQuantity"),
//     },
//     {
//       accessorKey: "systemQuantity",
//       header: t("inventory.inventoryReports.systemQuantity"),
//     },
//     {
//       accessorKey: "difference",
//       header: t("inventory.inventoryReports.difference"),
//     },
//   ];

//   const { data: InventoryRecordsData, isLoading: InventoryRecordsLoading } =
//     useInventoryRecords();
//   const inventoryRecordsColumns: ColumnDef<InventoryRecordType>[] = [
//     {
//       accessorKey: "inventoryCode",
//       header: t("inventory.inventoryReports.itemCode"),
//       cell: (info) => info.getValue(),
//     },
//     {
//       accessorKey: "date",
//       header: t("inventory.classCard.date"),
//       cell: (info) => info.getValue(),
//     },
//     {
//       accessorKey: "storeName",
//       header: t("inventory.warehouses.name"),
//       cell: (info) => info.getValue(),
//     },
//     {
//       id: "actions",
//       header: t("inventory.disbursementPermissions.actions"),
//       cell: () => (
//         <div className="flex gap-2 justify-center">
//           <Button
//             variant="outline"
//             size="sm"
//             className="text-green-600 border-green-400">
//             <Eye className="w-4 h-4 mr-1" /> {t("inventory.actions.view")}
//           </Button>
//           <Button
//             className="text-[#C41619] border-[#C41619]"
//             variant="outline"
//             size="sm">
//             <Trash2 className="w-4 h-4 mr-1" /> {t("inventory.actions.delete")}
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const { data: InventoryProductsData, isLoading: InventoryProductsLoading } =
//     useInventoryProductsData();
//   const deleteProduct = useDeleteInventoryProductsData();
//   const DeleteWareHouse = useDeleteWareHouse();

//   // In your component where you want to delete:
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteProduct
//         .mutateAsync(id)
//         .then((e) => toast.success("تم حذف المنتج بنجاح"));
//       // Handle success - maybe refresh the product list
//     } catch (error) {
//       // Handle error
//       toast.error("عذرا تعذر حذف المنتج");
//     }
//   };
//   const handleDeleteWareHouse = async (id: number) => {
//     try {
//       await DeleteWareHouse.mutateAsync(id).then((e) =>
//         toast.success("تم حذف المخزن بنجاح")
//       );
//       // Handle success - maybe refresh the product list
//     } catch (error) {
//       // Handle error
//       toast.error("عذرا تعذر حذف المخزن");
//     }
//   };
//   const productColumns: ColumnDef<InventoryProductsType>[] = [
//     {
//       accessorKey: "product_code",
//       header: t("inventory.products.productCode"),
//     },
//     {
//       accessorKey: "product_name",
//       header: t("inventory.products.productName"),
//     },
//     {
//       accessorKey: "product_category",
//       header: t("inventory.products.category"),
//     },
//     { accessorKey: "measure_unit", header: t("inventory.products.unit") },
//     { accessorKey: "updated_at", header: t("inventory.classCard.date") },
//     {
//       accessorKey: "product_purchase_price",
//       header: t("inventory.products.purchasePrice"),
//     },
//     {
//       accessorKey: "product_sell_price",
//       header: t("inventory.products.sellingPrice"),
//     },
//     {
//       accessorKey: "supplier_name",
//       header: t("inventory.products.mainSupplier"),
//     },
//     { accessorKey: "minLimit", header: t("inventory.products.minLimit") },
//     { accessorKey: "maxLimit", header: t("inventory.products.maxLimit") },
//     {
//       id: "actions",
//       header: t("inventory.disbursementPermissions.actions"),
//       cell: ({ row: { original } }: any) => (
//         <div className="flex justify-center gap-1">
//           <Button
//             onClick={() => {
//               handleDelete(original?.id);
//             }}
//             disabled={deleteProduct.isPending}
//             className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
//             <>
//               <DeleteIcon />
//               {t("inventory.actions.delete")}
//             </>
//           </Button>
//           <Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#16C47F]">
//             <EditIcon />
//             {t("inventory.actions.edit")}
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const { data: WarehousesData, isLoading: WarehousesLoading } =
//     useWarehousesData();
//   const warehouseColumns: ColumnDef<WarehouseType>[] = [
//     {
//       accessorKey: "id",
//       header: t("inventory.warehouses.code"),
//     },
//     {
//       accessorKey: "name",
//       header: t("inventory.warehouses.name"),
//     },
//     {
//       accessorKey: "type",
//       header: t("inventory.warehouses.type"),
//     },
//     {
//       accessorKey: "location",
//       header: t("inventory.warehouses.location"),
//     },
//     {
//       accessorKey: "facility_name",
//       header: t("inventory.warehouses.department"),
//     },
//     {
//       accessorKey: "max_capacity",
//       header: t("inventory.warehouses.capacity"),
//     },
//     {
//       id: "actions",
//       header: t("inventory.disbursementPermissions.actions"),
//       cell: ({ row: { original } }: any) => (
//         <div className="flex justify-center gap-1">
//           <Button
//             onClick={() => {
//               handleDeleteWareHouse(original?.id);
//             }}
//             disabled={DeleteWareHouse.isPending}
//             className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
//             <>
//               <DeleteIcon />
//               {t("inventory.actions.delete")}
//             </>
//           </Button>
//           <CustomPopUp
//             DialogTriggerComponent={() => {
//               return (
//                 <Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#16C47F]">
//                   <EditIcon />
//                   {t("inventory.actions.edit")}
//                 </Button>
//               );
//             }}
//             DialogContentComponent={({ closePopup }) => (
//               <AddNewWareHouse id={original?.id} closePopup={closePopup} />
//             )}
//           />
//         </div>
//       ),
//     },
//   ];

//   const { data: ClassCardData, isLoading: ClassCardLoading } =
//     useClassCardData();

//   const ClassCardColumns: ColumnDef<ClassCardType>[] = [
//     {
//       accessorKey: "logged_date",
//       header: t("inventory.classCard.date"),
//     },
//     {
//       accessorKey: "code",
//       header: t("inventory.classCard.code"),
//     },
//     {
//       accessorKey: "incoming",
//       header: t("inventory.classCard.incoming"),
//     },
//     {
//       accessorKey: "outgoing",
//       header: t("inventory.classCard.outgoing"),
//     },
//     {
//       accessorKey: "balance",
//       header: t("inventory.classCard.balance"),
//     },
//     {
//       accessorKey: "description",
//       header: t("inventory.classCard.description"),
//     },
//   ];

//   const [
//     showDisbursementPermissionsDetails,
//     setShowDisbursementPermissionsDetails,
//   ] = useState(false);
//   const {
//     data: DisbursementPermissionsData,
//     isLoading: DisbursementPermissionsLoading,
//   } = useDisbursementPermissionsData();
//   const {
//     mutate: deleteDisbursementPermissionsData,
//     isPending: deleteDisbursementPermissionsLoading,
//   } = useDeleteDisbursementPermissionsData();

//   const DisbursementPermissionsColumns: ColumnDef<DisbursementPermissionType>[] =
//     [
//       {
//         accessorKey: "code",
//         header: t("inventory.disbursementPermissions.code"),
//       },
//       {
//         accessorKey: "updated_at",
//         header: t("inventory.classCard.date"),
//       },
//       {
//         accessorKey: "product_name",
//         header: t("inventory.disbursementPermissions.name"),
//       },
//       {
//         accessorKey: "issued_quantity",
//         header: t("inventory.disbursementPermissions.quantity"),
//       },
//       {
//         accessorKey: "notes",
//         header: t("inventory.disbursementPermissions.reason"),
//       },
//       {
//         id: "actions",
//         header: t("inventory.disbursementPermissions.actions"),
//         cell: ({row:{original:{id}}}) => (
//           <div className="flex justify-center gap-1">
//             <Button disabled={deleteDisbursementPermissionsLoading} onClick={async()=>{
// 				try {
// 					await deleteDisbursementPermissionsData(id,{
// 						onSuccess:(e)=>{
// 							toast.success("تم حذف الصلاحية بنجاح")
// 						},
// 						onError:(e)=>{
// 							toast.error("عذرا تعذر حذف الصلاحية")
// 						}
// 					})
// 				} catch (error) {

// 				}
// 			}} className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
//               <>
//                 <DeleteIcon />
//                 {t("inventory.actions.delete")}
//               </>
//             </Button>
//           </div>
//         ),
//       },
//     ];

//   const { data: WarehouseTransferData, isLoading: WarehouseTransferLoading } =
//     useWarehouseTransferData();
//   const warehouseTransferColumns: ColumnDef<WarehouseTransferType>[] = [
//     {
//       accessorKey: "code",
//       header: t("inventory.warehouseTransfer.code"),
//     },
//     {
//       accessorKey: "date",
//       header: t("inventory.classCard.date"),
//     },
//     {
//       accessorKey: "store_from_name",
//       header: t("inventory.warehouseTransfer.sourceWarehouse"),
//     },
//     {
//       accessorKey: "store_to_name",
//       header: t("inventory.warehouseTransfer.destinationWarehouse"),
//     },
//     // {
//     //   id: "actions",
//     //   header: t("inventory.disbursementPermissions.actions"),
//     //   cell: () => (
//     //     <div className="flex gap-2 justify-center">
//     //       {/* <Button
//     //         variant="outline"
//     //         size="sm"
//     //         className="text-green-600 border-green-400">
//     //         <Eye className="w-4 h-4 mr-1" /> {t("inventory.actions.view")}
//     //       </Button> */}
//     //       <Button
//     //         className="text-[#C41619] border-[#C41619]"
//     //         variant="outline"
//     //         size="sm">
//     //         <Trash2 className="w-4 h-4 mr-1" /> {t("inventory.actions.delete")}
//     //       </Button>
//     //     </div>
//     //   ),
//     // },
//   ];

//   const { data: AdditionPermissionData, isLoading: AdditionPermissionLoading } =
//     useAdditionPermission();

//   const AdditionPermissionColumns: ColumnDef<AdditionPermissionType>[] = [
//     {
//       accessorKey: "supplier_id",
//       header: t("inventory.additionPermission.supplier"),
//     },
//     {
//       accessorKey: "invoice_number",
//       header: t("inventory.additionPermission.invoiceNumber"),
//     },
//     {
//       accessorKey: "quantity",
//       header: t("inventory.additionPermission.quantity"),
//     },
//     {
//       accessorKey: "invoice_date",
//       header: t("inventory.classCard.date"),
//     },
//     {
//       accessorKey: "discount",
//       header: t("inventory.additionPermission.discount"),
//     },
//     {
//       accessorKey: "invoice_attachment",
//       header: t("inventory.additionPermission.paymentMethod"),
//       cell: ({ row: { original } }: any) =>
//         original?.invoice_attachment && (
//           <Link href={original?.invoice_attachment} className=" rounded  flex justify-center">
//             <svg
//               width="24"
//               height="25"
//               viewBox="0 0 24 25"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg">
//               <g clipPath="url(#clip0_2481_8632)">
//                 <path
//                   d="M6.75 19.25H17.25M6.75 16.25H17.25M15.75 1.25001V6.50001C15.75 6.69893 15.829 6.88969 15.9697 7.03034C16.1103 7.171 16.3011 7.25001 16.5 7.25001H21.75M21.75 6.80001V23C21.75 23.1989 21.671 23.3897 21.5303 23.5303C21.3897 23.671 21.1989 23.75 21 23.75H3C2.80109 23.75 2.61032 23.671 2.46967 23.5303C2.32902 23.3897 2.25 23.1989 2.25 23V2.00001C2.25 1.8011 2.32902 1.61033 2.46967 1.46968C2.61032 1.32903 2.80109 1.25001 3 1.25001H16.275C16.3755 1.24943 16.4751 1.26904 16.5678 1.30769C16.6606 1.34634 16.7447 1.40324 16.815 1.47501L21.54 6.27501C21.6758 6.41591 21.7512 6.60432 21.75 6.80001Z"
//                   stroke="black"
//                   strokeLinecap="round"
//                 />
//                 <path
//                   d="M17.25 11H6.75C6.33579 11 6 11.3358 6 11.75V13.25C6 13.6642 6.33579 14 6.75 14H17.25C17.6642 14 18 13.6642 18 13.25V11.75C18 11.3358 17.6642 11 17.25 11Z"
//                   fill="black"
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_2481_8632">
//                   <rect
//                     width="24"
//                     height="24"
//                     fill="white"
//                     transform="translate(0 0.5)"
//                   />
//                 </clipPath>
//               </defs>
//             </svg>
//           </Link >
//         ),
//     },
//     {
//       id: "actions",
//       header: t("inventory.disbursementPermissions.actions"),
//       cell: () => (
//         <div className="flex justify-center gap-1">
//           <Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
//             <>
//               <DeleteIcon />
//               {t("inventory.actions.delete")}
//             </>
//           </Button>
//           <Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#16C47F]">
//             <EditIcon />
//             {t("inventory.actions.edit")}
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const [showSubWareHouses, setShowSubWareHouses] = useState(false);
//   const { data: SubWarehouseData, isLoading: SubWarehouseLoading } =
//     useSubWarehousesData();
//   const SubWarehouseColumns: ColumnDef<WarehouseType>[] = [
//     {
//       accessorKey: "code",
//       header: t("inventory.warehouses.code"),
//     },
//     {
//       accessorKey: "name",
//       header: t("inventory.warehouses.name"),
//     },
//     {
//       accessorKey: "type_id",
//       header: t("inventory.warehouses.type"),
//     },
//     {
//       accessorKey: "location",
//       header: t("inventory.warehouses.location"),
//     },
//     {
//       accessorKey: "facility_id",
//       header: t("inventory.warehouses.department"),
//     },
//     {
//       accessorKey: "max_capacity",
//       header: t("inventory.warehouses.capacity"),
//     },
//   ];
//   return (
//     <ReusableManyTable
//       dataSets={[
//         {
//           label: t("inventory.classCard.title"),
//           columns: ClassCardColumns,
//           data: ClassCardData || [],
//           loading: ClassCardLoading,
//           UserComponent: () => <ClassCardTopComponent />,
//         },
//         showinventoryDetails
//           ? {
//               columns: inventoryRecordsColumns,
//               data: InventoryRecordsData || [],
//               loading: InventoryRecordsLoading,
//               title: t("inventory.inventoryReports.recordTitle"),
//               withFilter: false,
//               onClick: () => setShowinventoryDetails(false),
//             }
//           : {
//               label: t("inventory.inventoryReports.title"),
//               columns: inventoryColumns,
//               data: InventoryReportsData || [],
//               loading: InventoryReportsLoading,
//               UserComponent: () => (
//                 <InventoryReportsTopComponent
//                   setShowinventoryDetails={setShowinventoryDetails}
//                 />
//               ),
//               withInlineAdd: true,
//               withInlineAddContent: [
//                 { type: "null" },
//                 { type: "input", inputType: "text" },
//                 { type: "input", inputType: "text" },
//                 { type: "input", inputType: "text" },
//                 { type: "input", inputType: "text" },
//                 { type: "input", inputType: "text" },
//               ],
//               onClick: () => setShowinventoryDetails(false),
//             },
//         showDisbursementPermissionsDetails
//           ? {
//               columns: warehouseTransferColumns,
//               data: WarehouseTransferData || [],
//               loading: WarehouseTransferLoading,
//               title: t("inventory.disbursementPermissions.title"),
//               withFilter: false,
//               onClick: () => setShowDisbursementPermissionsDetails(false),
//             }
//           : {
//               label: t("inventory.disbursementPermissions.title"),
//               columns: DisbursementPermissionsColumns,
//               data: DisbursementPermissionsData || [],
//               loading: DisbursementPermissionsLoading,
//               UserComponent: () => (
//                 <DisbursementPermissionsTopComponent
//                   setShowDisbursementPermissionsDetails={
//                     setShowDisbursementPermissionsDetails
//                   }
//                 />
//               ),
//               onClick: () => setShowDisbursementPermissionsDetails(false),
//             },
//         {
//           label: t("inventory.additionPermission.title"),
//           columns: AdditionPermissionColumns,
//           data: AdditionPermissionData || [],
//           loading: AdditionPermissionLoading,
//           UserComponent: () => <AddPermissionTopComponent />,
//         },
//         {
//           data: InventoryProductsData || [],
//           columns: productColumns,
//           loading: InventoryProductsLoading,
//           ButtonTrigger: () => {
//             return (
//               <CustomPopUp
//                 DialogTriggerComponent={() => {
//                   return (
//                     <AddButton
//                       AddTitle={t("inventory.products.newProduct")}
//                       onClickAdd={() => {}}
//                     />
//                   );
//                 }}
//                 DialogContentComponent={() => <AddNewProduct />}
//               />
//             );
//           },
//           UserComponent: () => (
//             <div className="px-6 pb-6">
//               <SearchBar />
//             </div>
//           ),
//           title: t("inventory.products.title"),
//           withFilter: false,
//         },
//         showSubWareHouses
//           ? {
//               data: SubWarehouseData || [],
//               columns: SubWarehouseColumns,
//               loading: SubWarehouseLoading,
//               ButtonTrigger: () => {
//                 return (
//                   <CustomPopUp
//                     DialogTriggerComponent={() => {
//                       return (
//                         <AddButton
//                           AddTitle={t("inventory.warehouses.newSubWarehouse")}
//                           onClickAdd={() => {}}
//                         />
//                       );
//                     }}
//                     DialogContentComponent={() => <AddNewSubWareHouse />}
//                   />
//                 );
//               },
//               UserComponent: () => (
//                 <div className="px-6 pb-6">
//                   <SearchBar />
//                 </div>
//               ),
//               onCellClick: ({ column }) => {
//                 if (column?.id === "type_id") {
//                   setShowSubWareHouses(false);
//                   return null;
//                 }
//                 if (column?.id !== "max_capacity") return null;
//                 return <MaxCapacityTable />;
//               },
//               title: "المخازن الفرعية لمخزن طيبة",
//               label: t("inventory.warehouses.title"),
//               withFilter: false,
//             }
//           : {
//               data: WarehousesData || [],
//               columns: warehouseColumns,
//               loading: WarehousesLoading,
//               ButtonTrigger: () => {
//                 return (
//                   <CustomPopUp
//                     DialogTriggerComponent={() => {
//                       return (
//                         <AddButton
//                           AddTitle={t("inventory.warehouses.newWarehouse")}
//                           onClickAdd={() => {}}
//                         />
//                       );
//                     }}
//                     DialogContentComponent={({ closePopup }) => (
//                       <AddNewWareHouse closePopup={closePopup} />
//                     )}
//                   />
//                 );
//               },
//               UserComponent: () => (
//                 <div className="px-6 pb-6">
//                   <SearchBar />
//                 </div>
//               ),
//               onCellClick: ({ column }) => {
//                 if (column?.id === "type") {
//                   setShowSubWareHouses(true);
//                   return null;
//                 }
//                 if (column?.id !== "capacity") return null;
//                 return <MaxCapacityTable />;
//               },

//               title: t("inventory.warehouses.title"),
//               withFilter: false,
//             },
//       ]}
//     />
//   );
// }
"use client";
import React from "react";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useClassCardTable } from "./hooks/TableHooks/useClassCardTable";
import { useInventoryTable } from "./hooks/TableHooks/useInventoryTable";
import { useDisbursementTable } from "./hooks/TableHooks/useDisbursementTable";
import { useAdditionPermissionTable } from "./hooks/TableHooks/useAdditionPermissionTable";
import { useInventoryProductsTable } from "./hooks/TableHooks/useInventoryProductsTable";
// import { useClassCardTable } from './hooks/useClassCardTable';
// import { useInventoryTable } from './hooks/useInventoryTable';
// import { useDisbursementTable } from './hooks/useDisbursementTable';
// import { useAdditionPermissionTable } from './hooks/useAdditionPermissionTable';
// import { useInventoryProductsTable } from './hooks/useInventoryProductsTable';

export default function Page() {
  const classCardTable = useClassCardTable();
  const inventoryTable = useInventoryTable();
  const disbursementTable = useDisbursementTable();
  const additionPermissionTable = useAdditionPermissionTable();
  const inventoryProductsTable = useInventoryProductsTable();

  return (
    <ReusableManyTable
      dataSets={[
        classCardTable,
        inventoryTable,
        disbursementTable,
        additionPermissionTable,
        inventoryProductsTable,
      ]}
    />
  );
}
