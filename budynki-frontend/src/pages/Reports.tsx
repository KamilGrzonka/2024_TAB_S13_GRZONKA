import { Box, Container, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zDate } from "@/components/forms/zodWrapper";
import FormDatepicker from "@/components/forms/formElement/FormDatePicker";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  dataPoczatkowa: zDate(),
  dataKoncowa: zDate(),
});

export function Reports() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    navigate(
      `zarzadczy?dataPoczatkowa=${data.dataPoczatkowa.valueOf()}&dataKoncowa=${data.dataKoncowa.valueOf()}`,
      { relative: "path" },
    );
  }

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "inline-block",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 4,
        }}
      >
        <Typography variant="h3">{`Raporty`}</Typography>
      </Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dataPoczatkowa"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <span className="text-red-500">*</span>Data Początkowa
                </FormLabel>
                <FormDatepicker
                  field={field as unknown as ControllerRenderProps}
                  name={"dataPoczatkowa"}
                  form={form as unknown as UseFormReturn}
                  datePickerLimits={{ maxField: "dataKoncowa" }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataKoncowa"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <span className="text-red-500">*</span>Data Końcowa
                </FormLabel>
                <FormDatepicker
                  field={field as unknown as ControllerRenderProps}
                  name={"dataKoncowa"}
                  form={form as unknown as UseFormReturn}
                  datePickerLimits={{ minField: "dataPoczatkowa" }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row space-x-5">
            <Button type="submit">Wyświetl Raport Zarządczy</Button>
          </div>
        </form>
      </Form>
      <Separator className="my-4" />
      <Button asChild>
        <Link to="operacyjny">Wyświetl Raport Operacyjny</Link>
      </Button>
    </Container>
  );
}

export default Reports;
