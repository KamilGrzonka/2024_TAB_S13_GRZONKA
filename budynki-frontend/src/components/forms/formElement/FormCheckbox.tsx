import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface FormCheckBoxProps<T extends ControllerRenderProps> {
  field: T;
}

export default function FormCheckbox<T extends ControllerRenderProps>({
  field,
}: FormCheckBoxProps<T>) {
  field.value =
    field.value === "true"
      ? true
      : field.value === "false"
        ? false
        : field.value;
  return (
    <FormControl>
      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    </FormControl>
  );
}
