import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AnySchema } from "@/types/AnySchema";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

interface FormTextAreaProps {
  field: ControllerRenderProps<z.infer<AnySchema>>;
  name: string;
}

export default function FormTextArea({ field, name }: FormTextAreaProps) {
  return (
    <FormControl>
      <Textarea
        placeholder={camelToTitle(name)}
        className="resize-y"
        {...field}
        value={field.value as string | number | readonly string[] | undefined}
      />
    </FormControl>
  );
}
