import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormFieldOptionDefiner } from "../FormDefiner";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { AnySchema } from "@/types/AnySchema";

interface FormRadioProps {
  field: ControllerRenderProps<z.infer<AnySchema>>;
  options: FormFieldOptionDefiner[];
}

export default function FormRadio({ field, options }: FormRadioProps) {
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={field.value as string | undefined}
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
