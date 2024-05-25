import { FormControl } from "@/components/ui/form";
import { FormFieldOptionDefiner } from "../FormDefiner";
import camelToTitle from "@/utils/camelToTitle";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

interface FormSelectProps<T extends ControllerRenderProps> {
  field: T;
  name: string;
  options: FormFieldOptionDefiner[];
  customLabel?: string;
  form: UseFormReturn;
}

export default function FormSelect<T extends ControllerRenderProps>({
  field,
  name,
  options,
  customLabel,
  form,
}: FormSelectProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value
              ? options.find((option) => option.id == field.value)?.label
              : customLabel ?? camelToTitle(name)}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder={customLabel ?? camelToTitle(name)} />
          <CommandEmpty>Brak wyników.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              <CommandItem
                value={`-`}
                onSelect={() => {
                  form.setValue(name, "");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    "" === field.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {"-"}
              </CommandItem>
              {options?.map(({ id, label }) => (
                <CommandItem
                  key={id}
                  value={`${id} ${label}`}
                  onSelect={() => {
                    form.setValue(name, id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      id === field.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
