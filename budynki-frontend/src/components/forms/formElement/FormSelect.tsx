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

interface FormSelectProps<T extends ControllerRenderProps> {
  field: T;
  name: string;
  options: FormFieldOptionDefiner[];
}

export default function FormSelect<T extends ControllerRenderProps>({ field, name, options }: FormSelectProps<T>) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
