import React, { useState } from 'react'
import { useAddSupplierType, useUpdateSupplierType } from '../../hooks/useTypesSup';
import toast from 'react-hot-toast';
import CustomInput from '@/components/customInput';
import { Button } from '@heroui/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AddNewSupplierType({
  closePopup,
  type,
}: {
  closePopup?: any;
  type?: any;
}) {
  const [newType, setNewType] = useState(type?.type || "");

  const { mutate: addType, isPending: isAdding } = useAddSupplierType();
  const { mutate: updateType, isPending: isUpdating } = useUpdateSupplierType();

  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const handleSubmit = () => {
    if (type?.id) {
      // تعديل نوع مورد
      updateType(
        { id: type.id, formData: {type:newType} },
        {
          onSuccess: () => {
            notifySuccess("تم تعديل النوع بنجاح!");
            closePopup?.();
          },
        }
      );
    } else {
      // إضافة نوع مورد جديد
      addType(
        { type: newType },
        {
          onSuccess: () => {
            notifySuccess("تم إضافة النوع بنجاح!");
            closePopup?.();
          },
        }
      );
    }
  };

  return (
    <Card className="p-0">
      <CardHeader>ادخل نوع مورد جديد</CardHeader>
      <CardContent className="flex gap-5 p-6">
        <CustomInput
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          type="text"
        />
        <Button
          size="sm"
          isLoading={isAdding || isUpdating}
          onPress={handleSubmit}
          className="w-full text-[#16C47F] border border-[#16C47F] hover:opacity-85 h-[48px] rounded-[8px] py-2"
        >
          {type?.id ? "تأكيد التعديل" : "تأكيد الإضافة"}
        </Button>
      </CardContent>
    </Card>
  );
}
