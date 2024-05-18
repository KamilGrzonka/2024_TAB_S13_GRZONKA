import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FormFieldOptionDefiner } from "../FormDefiner";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { AnySchema } from "@/types/AnySchema";

interface FormSelectProps {
  field: ControllerRenderProps<z.infer<AnySchema>>;
  name: string;
  options: FormFieldOptionDefiner[];
}

export default function FormSelect({ field, name, options }: FormSelectProps) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value as string | undefined}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={camelToTitle(name)} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options?.map(({ id, label }) => (
          <SelectItem key={id} value={`${id}`}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
