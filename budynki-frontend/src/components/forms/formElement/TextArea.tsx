import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps } from "react-hook-form";

interface FormTextAreaProps<T extends ControllerRenderProps> {
  field: T;
  name: string;
}

export default function FormTextArea<T extends ControllerRenderProps>({ field, name }: FormTextAreaProps<T>) {
  return (
    <FormControl>
      <Textarea
        placeholder={camelToTitle(name)}
        className="resize-y"
        {...field}
      />
    </FormControl>
  );
}
