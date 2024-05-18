import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormFieldOptionDefiner } from "@/types/FormDefiner";
import { ControllerRenderProps } from "react-hook-form";

interface FormRadioProps {
  field: ControllerRenderProps<any, any>;
  options: FormFieldOptionDefiner[];
}

export default function FormRadio({ field, options }: FormRadioProps) {
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
