import { z } from "zod";
import { zNonNegative, zNumber } from "../zodWrapper";
import { PriceListData } from "@/types/PriceListData";
import { FormFieldType } from "@/types/enums/FormFieldType";
import { FormFieldDefiner } from "../FormDefiner";

export const priceListFormSchema = z.object({
  dataPoczatkowa: z.coerce.date(), // nullable = false
  dataKoncowa: z.coerce.date(), // nullable = false
  cena: zNumber().pipe(zNonNegative()), // scale = 2, precision = 10, nullable = false
});

export type PriceListFormSchema = typeof priceListFormSchema;

export type PriceListFormKeys = "dataPoczatkowa" | "dataKoncowa" | "cena";

interface priceListFormFieldsData {
  entityData?: PriceListData;
}

export function priceListFormFields({
  entityData
}: priceListFormFieldsData = {}) {
  const entityFormField: FormFieldDefiner<PriceListFormKeys>[] = [
    {
      name: "dataPoczatkowa",
      defaultValue: `${entityData?.dataPoczatkowa || ""}`,
      type: FormFieldType.DATEPICKER,
      options: [],
    },
    {
      name: "dataKoncowa",
      defaultValue: `${entityData?.dataKoncowa || ""}`,
      type: FormFieldType.DATEPICKER,
      options: [],
    },
    {
      name: "cena",
      defaultValue: `${entityData?.cena || ""}`,
      type: FormFieldType.INPUT_NUMBER,
      options: [],
    },
  ];
  return entityFormField;
}
