import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { pl } from "date-fns/locale"

interface FormDatepickerProps<T extends ControllerRenderProps> {
  field: T;
  name: string;
  form: UseFormReturn;
}

export default function FormDatepicker<T extends ControllerRenderProps>({
  field,
  name,
  form,
}: FormDatepickerProps<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value ? (
              format(field.value, "PPP", {locale: pl})
            ) : (
              <span>Wybierz datę</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">
        <Button variant="outline" className="w-full" onClick={() => {
                  form.setValue(name, "");
                }}>
          Reset
        </Button>
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => date < new Date("1900-01-01")}
          locale={pl}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
