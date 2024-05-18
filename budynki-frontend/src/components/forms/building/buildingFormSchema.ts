import { z } from "zod";
import { polishChars, zNonNegative, zNumber, zStringMinMax } from "../zodWrapper";
import { BuildingData } from "@/types/BuildingData";
import { FormFieldDefiner } from "@/types/FormDefiner";
import { FormFieldType } from "@/types/enums/FormFieldType";

export const buildingFormSchema = z.object({
  ulica: zStringMinMax(), // length = 80, nullable = false
  numerBudynku: zStringMinMax({max: 5}).regex(RegExp(`^\\d+[${polishChars}]?$`), "Wprowadź poprawny numer budynku"), // length = 5, nullable = false
  kodPocztowy: zStringMinMax({min: 6, max: 6}).regex(/^\d{2}-\d{3}$/, "Wprowadź poprawny kod pocztowy"), // length = 6, nullable = false
  miasto: zStringMinMax().regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne miasto"), // length = 80, nullable = false
  liczbaMiejsc: zNumber().pipe(zNonNegative()), // nullable = false
});

export type BuildingFormSchema = typeof buildingFormSchema;

export type BuildingFormKeys = "ulica" | "numerBudynku" | "kodPocztowy" | "miasto" | "liczbaMiejsc";

export function buildingFormFields(entityData?: BuildingData) {
  const entityFormField: FormFieldDefiner<BuildingFormKeys>[] = [
    {
      name: "ulica",
      defaultValue: `${entityData?.ulica || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "numerBudynku",
      defaultValue: `${entityData?.numerBudynku || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "kodPocztowy",
      defaultValue: `${entityData?.kodPocztowy || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "miasto",
      defaultValue: `${entityData?.miasto || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "liczbaMiejsc",
      defaultValue: `${entityData?.liczbaMiejsc || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
  ];
  return entityFormField;
}