import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ControllerRenderProps } from "react-hook-form";
import { FormFieldOptionDefiner } from "../FormDefiner";

interface FormRadioProps<T extends ControllerRenderProps> {
  field: T;
  options: FormFieldOptionDefiner[];
}

export default function FormRadio<T extends ControllerRenderProps>({
  field,
  options,
}: FormRadioProps<T>) {
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value}
        className="flex flex-col space-y-1"
      >
        {options?.map(({ id, label }) => (
          <FormItem key={id} className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value={`${id}`} />
            </FormControl>
            <FormLabel className="font-normal">{label}</FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
