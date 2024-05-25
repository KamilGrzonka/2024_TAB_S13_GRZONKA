import { AnyEntity } from "@/types/Entities";
import { AnyFormKeys } from "@/types/FormKeys";
import { HttpMethods } from "@/types/HttpMethods";
import { ZodObject, z } from "zod";

export type FormFieldType =
  | "INPUT"
  | "INPUT_NUMBER"
  | "RADIO"
  | "SELECT"
  | "SELECT_MULTIPLE"
  | "DATEPICKER"
  | "TEXTAREA";

export type FormFieldOptionDefiner = {
  id: number | string;
  label: string;
}

type FormFieldDefiner = {
  type: FormFieldType;
  defaultValue: unknown;
  options: FormFieldOptionDefiner[];
}

type FormFieldsDefiner<T extends AnyFormKeys> = {
  [K in T]-?: FormFieldDefiner;
};

export type FormSchema<T extends AnyFormKeys> = {
  [K in T]-?: z.ZodTypeAny;
};

export type FormDefiner<T extends AnyFormKeys> = {
  formSchema: ZodObject<FormSchema<T>>;
  formFields: FormFieldsDefiner<T>;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: object;
};

export function formDefiner<T extends AnyFormKeys>(
  formSchemaDefiner: FormSchema<T>,
  formFieldDefiner: FormFieldsDefiner<T>,
  endpoint: string,
  method: HttpMethods,
  additionalSubmitFields?: object,
) {
  const formSchema = z.object(formSchemaDefiner);
  const formFields = formFieldDefiner;
  const formDefiner: FormDefiner<T> = {
    formSchema,
    formFields,
    endpoint,
    method,
    additionalSubmitFields,
  };
  return formDefiner;
}

export function optionDataToLabel<U extends AnyEntity>( // nie testowane
  labels: (keyof U)[],
  optionsData: U[],
  additionalLabelText?: {[K in keyof U]? : string}
): FormFieldOptionDefiner[] {
  return optionsData
    ? optionsData.map((option: U) => ({
        id: option.id,
        label: labels.map((label) => `${additionalLabelText?.[label] || ""}${option[label]}`).join(" "),
      }))
    : [];
}
