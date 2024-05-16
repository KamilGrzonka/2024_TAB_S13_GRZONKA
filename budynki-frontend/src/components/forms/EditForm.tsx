import { AnyEntity } from "@/types/AnyEntity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getBackendApi, putBackendApi } from "../fetchBackendApi";
import { formSubmit } from "./formSubmit";
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
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

interface EditFormProps {
  URL: string;
  FORM_SCHEMA: any;
  ADITIONAL_FORM_SUBMIT_VALUES: any;
  QUERY_KEYS: any[];
}

export default function EditForm<T = AnyEntity>({
  URL,
  FORM_SCHEMA,
  ADITIONAL_FORM_SUBMIT_VALUES,
  QUERY_KEYS,
}: EditFormProps) {
  const defaultValues = useMemo(
    () =>
      Object.keys(FORM_SCHEMA.shape).reduce(
        (acc, key) => ({
          ...acc,
          [key]: undefined,
        }),
        {},
      ),
    [FORM_SCHEMA.shape],
  );

  const query = useQuery({
    queryKey: [...QUERY_KEYS],
    queryFn: () => getBackendApi<T>(URL),
  });

  const form = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const data = query.data;
      type DataKeyType = keyof typeof data;
      const newDefaultValues = Object.keys(defaultValues).reduce(
        (acc, key) => ({
          ...acc,
          [key]: data[key as DataKeyType] ?? undefined,
        }),
        {},
      );
      form.reset(newDefaultValues);
    }
  }, [defaultValues, form, query.isSuccess, query.data]);

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
    (await formSubmit(putBackendApi, URL, {
      ...ADITIONAL_FORM_SUBMIT_VALUES,
      ...values,
    })) && navigate("..", { relative: "path" });
  }

  return query.isSuccess ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((key) => (
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
          Edytuj
        </Button>
      </form>
    </Form>
  ) : query.isLoading ? (
    <div className="flex items-center justify-center">
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <span className="text-red-700">Error!</span>
    </div>
  );
}
