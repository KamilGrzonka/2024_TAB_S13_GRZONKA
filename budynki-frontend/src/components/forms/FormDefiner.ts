import { AnyEntity } from "@/types/AnyEntity";
import { AnyFormKeys } from "@/types/AnyFormKeys";
import { FormFieldType } from "@/types/enums/FormFieldType";

export interface FormFieldOptionDefiner {
  id: number;
  label: string;
}

export interface FormFieldDefiner<T extends AnyFormKeys> {
  name: T;
  type: FormFieldType;
  defaultValue: string;
  options: FormFieldOptionDefiner[];
}

export type FormOptionsData<T extends AnyFormKeys, U extends AnyEntity> = {
  [key in T]: U[];
};

export function optionDataToLabel<T extends AnyFormKeys, U extends AnyEntity>( // nie testowane
  name: T,
  labels: (keyof U)[],
  optionsData: FormOptionsData<T, U>,
): FormFieldOptionDefiner[] {
  return optionsData
    ? optionsData[name].map((option: U) => ({
        id: option.id,
        label: labels.map((label) => option[label]).join(" "),
      }))
    : [];
}
