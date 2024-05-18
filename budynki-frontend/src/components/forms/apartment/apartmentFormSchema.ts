import { z } from "zod";
import { zNonNegative, zNumber, zPositive, zStringMinMax } from "../zodWrapper";
import { FormFieldDefiner } from "@/types/FormDefiner";
import { FormFieldType } from "@/types/enums/FormFieldType";
import { ApartmentData } from "@/types/ApartmentData";

export const apartmentFormSchema = z.object({
  numerMieszkania: zNumber().pipe(zPositive()), // nullable = false
  pietro: zNumber().pipe(zNonNegative()), // nullable = false
  liczbaMieszkancow: zNumber().pipe(zNonNegative()), // nullable = false
  opis: zStringMinMax({ min: 0, max: 65535 }).optional(), // length = 65535
});

export type ApartmentFormSchema = typeof apartmentFormSchema;

export type ApartmentFormKeys =
  | "numerMieszkania"
  | "pietro"
  | "liczbaMieszkancow"
  | "opis";

export function apartmentFormFields(entityData?: ApartmentData) {
  const entityFormField: FormFieldDefiner<ApartmentFormKeys>[] = [
    {
      name: "numerMieszkania",
      defaultValue: `${entityData?.numerMieszkania || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "pietro",
      defaultValue: `${entityData?.pietro || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "liczbaMieszkancow",
      defaultValue: `${entityData?.liczbaMieszkancow || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "opis",
      defaultValue: `${entityData?.opis || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
  ];
  return entityFormField;
}
