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
import { pl } from "date-fns/locale";
import { DatePickerLimits } from "../FormDefiner";
import { AnyFormKeys } from "@/types/FormKeys";

interface FormDatepickerProps<
  T extends ControllerRenderProps,
  U extends AnyFormKeys,
> {
  field: T;
  name: string;
  form: UseFormReturn;
  datePickerLimits?: DatePickerLimits<U>;
}

export default function FormDatepicker<
  T extends ControllerRenderProps,
  U extends AnyFormKeys,
>({ field, name, form, datePickerLimits }: FormDatepickerProps<T, U>) {
  const formMinDate = datePickerLimits?.minField
    ? form.getValues(datePickerLimits.minField)
    : undefined;
  const formMaxDate = datePickerLimits?.maxField
    ? form.getValues(datePickerLimits.maxField)
    : undefined;

  function disableDates(date: Date) {
    if (
      datePickerLimits?.ranges?.some(
        (range) => date >= range.min && date <= range.max,
      )
    ) {
      return true;
    }
    if (formMinDate && date < new Date(formMinDate)) {
      return true;
    }
    if (formMaxDate && date > new Date(formMaxDate)) {
      return true;
    }
    return false;
  }

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
              format(field.value, "PPP", { locale: pl })
            ) : (
              <span>Wybierz datę</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-auto flex-col space-y-2 p-2"
        align="start"
      >
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            form.setValue(name, "");
            form.trigger();
          }}
        >
          Reset
        </Button>
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => disableDates(date)}
          locale={pl}
          initialFocus
          defaultMonth={field.value}
        />
      </PopoverContent>
    </Popover>
  );
}
