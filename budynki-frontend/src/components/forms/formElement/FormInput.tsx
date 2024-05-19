import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps } from "react-hook-form";
import { FormFieldType } from "../FormDefiner";

interface FormInputProps<T extends ControllerRenderProps> {
  field: T;
  type: FormFieldType;
  name: string;
}

export default function FormInput<T extends ControllerRenderProps>({ field, type, name }: FormInputProps<T>) {
  return (
    <FormControl>
      <Input
        type={type == "INPUT_NUMBER" ? "number" : "text"}
        placeholder={camelToTitle(name)}
        {...field}
      />
    </FormControl>
  );
}
