import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useMemo } from "react";
import { formSubmit } from "./formSubmit";
import { postBackendApi } from "../fetchBackendApi";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import camelToTitle from "@/utils/camelToTitle";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { AnySchema } from "@/types/AnySchema";

interface EditFormProps {
  URL: string;
  FORM_SCHEMA: AnySchema;
  ADITIONAL_FORM_SUBMIT_VALUES?: object;
}

export default function AddForm({
  URL,
  FORM_SCHEMA,
  ADITIONAL_FORM_SUBMIT_VALUES,
}: EditFormProps) {
  const defaultValues = useMemo(
    () =>
      Object.keys(FORM_SCHEMA.shape).reduce(
        (acc, key) => ({
          ...acc,
          [key]: "",
        }),
        {},
      ),
    [FORM_SCHEMA.shape],
  );

  const form = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
    (await formSubmit(postBackendApi, URL, {
      ...ADITIONAL_FORM_SUBMIT_VALUES,
      ...values,
    })) && navigate("..", { relative: "path" });
  }

  type SchemaShapeKeyType = keyof typeof FORM_SCHEMA.shape;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(FORM_SCHEMA.shape).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as SchemaShapeKeyType}
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
          Dodaj
        </Button>
      </form>
    </Form>
  );
}
