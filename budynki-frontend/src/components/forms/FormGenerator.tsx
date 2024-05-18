import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { formSubmit } from "./formSubmit";
import { fetchBackendApi } from "../fetchBackendApi";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import camelToTitle from "@/utils/camelToTitle";
import { FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form";
import { AnySchema } from "@/types/AnySchema";
import FormInput from "./formElement/FormInput";
import FormRadio from "./formElement/FormRadio";
import FormSelect from "./formElement/FormSelect";
import FormDatepicker from "./formElement/DatePicker";
import { FormFieldType } from "@/types/enums/FormFieldType";
import { AnyFormKeys } from "@/types/AnyFormKeys";
import FormTextArea from "./formElement/TextArea";
import { FormFieldDefiner } from "./FormDefiner";

interface FormGeneratorProps {
  formSchema: AnySchema;
  formFieldDefiner: FormFieldDefiner<AnyFormKeys>[];
  url: string;
  method: string;
  additionalSubmitFields: object;
}

export default function FormGenerator({
  formSchema,
  formFieldDefiner,
  url,
  method,
  additionalSubmitFields,
}: FormGeneratorProps) {
  const defaultValues = formFieldDefiner.reduce(
    (acc, { name, defaultValue }) => ({
      ...acc,
      [name]: defaultValue,
    }),
    {},
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    (await formSubmit(fetchBackendApi, url, method, {
      ...additionalSubmitFields,
      ...values,
    })) && navigate("..", { relative: "path" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFieldDefiner.map(({ name, type, options }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{camelToTitle(name)}:</FormLabel>

                {type == FormFieldType.INPUT ||
                type == FormFieldType.INPUT_NUMBER ? (
                  <FormInput field={field} type={type} name={name} />
                ) : type == FormFieldType.RADIO ? (
                  <FormRadio field={field} options={options} />
                ) : type == FormFieldType.SELECT ? (
                  <FormSelect field={field} options={options} name={name} />
                ) : type == FormFieldType.DATEPICKER ? (
                  <FormDatepicker field={field} />
                ) : type == FormFieldType.TEXTAREA ? (
                  <FormTextArea field={field} name={name} />
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="text-red-700">
                      Form field type not supported!
                    </span>
                  </div>
                )}

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
          {method == 'PUT' ? "Edytuj" : "Dodaj"}
        </Button>
      </form>
    </Form>
  );
}
