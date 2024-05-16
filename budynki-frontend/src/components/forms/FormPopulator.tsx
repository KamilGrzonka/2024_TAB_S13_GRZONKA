import camelToTitle from "@/utils/camelToTitle";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

interface FormPopulatorProps {
  buttonLabel: string;
}

export default function FormPopulator({ buttonLabel }: FormPopulatorProps) {
  const form = useFormContext();
  return (
    <>
      {Object.keys(form.getValues()).map((key) => (
        <FormField
          key={key}
          control={form.control}
          name={key}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{camelToTitle(field.name)}:</FormLabel>
              <FormControl>
                <Input placeholder={camelToTitle(field.name)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        disabled={form.formState.isLoading || !form.formState.isValid}
        type="submit"
      >
        {form.formState.isLoading && (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        {buttonLabel}
      </Button>
    </>
  );
}
