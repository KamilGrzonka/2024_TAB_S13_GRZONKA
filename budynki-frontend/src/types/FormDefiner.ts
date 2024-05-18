import { AnyFormKeys } from "./AnyFormKeys";
import { FormFieldType } from "./enums/FormFieldType";

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
