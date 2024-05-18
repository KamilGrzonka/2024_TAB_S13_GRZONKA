import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "@/types/enums/FormFieldType";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps } from "react-hook-form";

interface FormInputProps {
  field: ControllerRenderProps<any, any>;
  type: FormFieldType;
  name: string;
}

export default function FormInput({ field, type, name }: FormInputProps) {
  return (
    <FormControl>
      <Input
        type={type == FormFieldType.INPUT_NUMBER ? "number" : "text"}
        placeholder={camelToTitle(name)}
        {...field}
      />
    </FormControl>
  );
}
