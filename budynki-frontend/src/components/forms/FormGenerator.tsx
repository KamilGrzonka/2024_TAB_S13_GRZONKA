import { zodResolver } from "@hookform/resolvers/zod";
import {
  ControllerRenderProps,
  DefaultValues,
  Path,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ZodLiteral, ZodUnion, z } from "zod";
import { formSubmit } from "./formSubmit";
import { fetchBackendApi } from "../fetchBackendApi";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import camelToTitle from "@/utils/camelToTitle";
import { FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form";
import FormInput from "./formElement/FormInput";
import FormRadio from "./formElement/FormRadio";
import FormSelect from "./formElement/FormSelect";
import FormDatepicker from "./formElement/DatePicker";
import FormTextArea from "./formElement/TextArea";
import { FormDefiner } from "./FormDefiner";
import { AnyFormKeys } from "@/types/FormKeys";

interface FormGeneratorProps<T extends AnyFormKeys> {
  formDefiner: FormDefiner<T>;
}

export default function FormGenerator<T extends AnyFormKeys>({
  formDefiner,
}: FormGeneratorProps<T>) {
  const defaultValues = Object.keys(formDefiner.formFields).reduce(
    (acc, key) => ({
      ...acc,
      [key]:
        formDefiner.formFields[key as T].defaultValue != null ||
        formDefiner.formFields[key as T].defaultValue != undefined
          ? `${formDefiner.formFields[key as T].defaultValue}`
          : "",
    }),
    {} as DefaultValues<z.infer<typeof formDefiner.formSchema>>,
  );

  const form = useForm<z.infer<typeof formDefiner.formSchema>>({
    resolver: zodResolver(formDefiner.formSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formDefiner.formSchema>) {
    const valuesWithUndefined = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        value === "" ? undefined : value,
      ]),
    );
    (await formSubmit(
      fetchBackendApi,
      formDefiner.endpoint,
      formDefiner.method,
      {
        ...formDefiner.additionalSubmitFields,
        ...valuesWithUndefined,
      },
    )) && navigate("..", { relative: "path" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(formDefiner.formFields).map((key) => {
          const name = key as T;
          const type = formDefiner.formFields[key as T].type;
          const options = formDefiner.formFields[key as T].options;
          const customLabel = formDefiner.formFields[key as T].customLabel;

          const isOptional =
            formDefiner.formSchema.shape[name] instanceof ZodUnion &&
            formDefiner.formSchema.shape[name]._def.options.some(
              (option: unknown) =>
                option instanceof ZodLiteral && option.value === "",
            );

          return (
            <FormField
              key={name}
              control={form.control}
              name={
                name as unknown as Path<z.infer<typeof formDefiner.formSchema>>
              }
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    {!isOptional ? (
                      <span className="text-red-500">*</span>
                    ) : (
                      <></>
                    )}
                    {customLabel ?? camelToTitle(name)}:
                  </FormLabel>
                  {/* Debug lines */}
                  {/* <p className="font-bold">Wartość pola: {field.value as unknown instanceof Date ? (field.value as Date).toDateString() : field.value as string}</p> */}
                  {/* <p className="font-bold">Wartość pola: {`${field.value}`}</p> */}
                  {type == "INPUT" || type == "INPUT_NUMBER" ? (
                    <FormInput
                      field={field as unknown as ControllerRenderProps}
                      type={type}
                      name={name}
                      customLabel={customLabel}
                    />
                  ) : type == "RADIO" ? (
                    <FormRadio
                      field={field as unknown as ControllerRenderProps}
                      options={options}
                    />
                  ) : type == "SELECT" ? (
                    <FormSelect
                      field={field as unknown as ControllerRenderProps}
                      options={options}
                      name={name}
                      customLabel={customLabel}
                      form={form as unknown as UseFormReturn}
                    />
                  ) : type == "DATEPICKER" ? (
                    <FormDatepicker
                      field={field as unknown as ControllerRenderProps}
                      name={name}
                      form={form as unknown as UseFormReturn}
                    />
                  ) : type == "TEXTAREA" ? (
                    <FormTextArea
                      field={field as unknown as ControllerRenderProps}
                      name={name}
                      customLabel={customLabel}
                    />
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
          );
        })}
        <div className="flex items-center justify-between">
          <Button
            disabled={form.formState.isLoading || !form.formState.isValid}
            type="submit"
            className="pt-6 pb-6 pl-10 pr-10"
          >
            {form.formState.isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            {formDefiner.method == "PUT" ? "Edytuj" : "Dodaj"}
          </Button>
          <Button
            type="button"
            className="pt-6 pb-6 pl-10 pr-10"
            onClick={() => navigate(-1)}
          >
            Anuluj
          </Button>
        </div>
      </form>
    </Form>
  );
}
