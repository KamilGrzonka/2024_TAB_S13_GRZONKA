import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FormFieldOptionDefiner } from "@/types/FormDefiner";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps } from "react-hook-form";

interface FormSelectProps {
  field: ControllerRenderProps<any, any>;
  name: string;
  options: FormFieldOptionDefiner[];
}

export default function FormSelect({ field, name, options }: FormSelectProps) {
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
