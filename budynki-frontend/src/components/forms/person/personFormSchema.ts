import { z } from "zod";
import { polishChars, zNumber, zNumberMinMaxDigits, zStringMinMax } from "../zodWrapper";
import { PersonData } from "@/types/PersonData";
import { FormFieldType } from "@/types/enums/FormFieldType";
import { FormFieldDefiner } from "../FormDefiner";

export const personFormSchema = z.object({
  pesel: zNumber().pipe(zNumberMinMaxDigits({min: 11, max: 11})), // length = 11, nullable = false, unique = true
  imie: zStringMinMax({ max: 40 }).regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne imię"), // length = 40, nullable = false
  nazwisko: zStringMinMax({ max: 40 }).regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne nazwisko"), // length = 40, nullable = false
});

export type PersonFormSchema = typeof personFormSchema;

export type PersonFormKeys = "pesel" | "imie" | "nazwisko";

interface PersonFormFieldsData {
  entityData?: PersonData;
}

export function personFormFields({
  entityData,
}: PersonFormFieldsData = {}) {
  const entityFormField: FormFieldDefiner<PersonFormKeys>[] = [
    {
      name: "pesel",
      defaultValue: `${entityData?.pesel || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "imie",
      defaultValue: `${entityData?.imie || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
    {
      name: "nazwisko",
      defaultValue: `${entityData?.nazwisko || ""}`,
      type: FormFieldType.INPUT,
      options: [],
    },
  ];
  return entityFormField;
}