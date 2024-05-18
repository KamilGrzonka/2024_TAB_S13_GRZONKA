import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnySchema } from "@/types/AnySchema";
import { FormFieldType } from "@/types/enums/FormFieldType";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  field: ControllerRenderProps<z.infer<AnySchema>>;
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
        value={field.value as string | number | readonly string[] | undefined}
      />
    </FormControl>
  );
}
