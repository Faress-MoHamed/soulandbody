import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import CustomSelect from "@/components/customSelect";
import { useDispatch, useSelector } from "react-redux";
import {
	setStartDate,
	setEndDate,
	setType,
	resetForm,
	setNumberOfDays,
} from "./vacationRequest.slice";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useReqUserVacations } from "../../hooks/useUserVacations";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function RequestVacation({ closePopup }: any) {
  const t = useTranslations("userHr.requestVacation");
  const { t: TTT } = useTypedTranslation();
  const dispatch = useDispatch();
  const {
    vacation_start_date,
    return_date,
    number_of_days,
    vacation_type,
    loading,
    error,
  } = useTypedSelector((state) => state.vacationRequest);
  const { mutate, isPending } = useReqUserVacations();
  const handleSubmit = () => {
    mutate(
      {
        vacation_start_date,
        return_date,
        number_of_days,
        vacation_type,
      },
      {
        onSuccess: () => {
          closePopup();
        },
      }
    );
    // TODO: Implement API call to submit vacation request
    console.log({
      vacation_start_date,
      return_date,
      number_of_days,
      vacation_type,
    });
  };

  return (
    <Card className="flex flex-col px-6 py-9 gap-6  md:w-fit md:h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 place-items-end">
          <CustomInput
            type="date"
            label={t("start")}
            value={vacation_start_date}
            onChange={(e) => dispatch(setStartDate(e.target.value))}
          />
          <CustomInput
            type="date"
            label={t("end")}
            value={return_date}
            onChange={(e) => dispatch(setEndDate(e.target.value))}
          />
          <CustomInput
            type="number"
            label={"عدد الايام"}
            value={number_of_days}
            onChange={(e) => dispatch(setNumberOfDays(+e.target.value))}
          />
          <CustomSelect
            label={t("type")}
            value={vacation_type}
            options={["Sick", "Annual", "Casual"]}
            onValueChange={(e) => dispatch(setType(e))}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="flex md:mt-0 mt-3">
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[148px] h-[48px] md:mt-8"
            onPress={handleSubmit}
            disabled={isPending}>
            {isPending ? "pending..." : t("submit")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
