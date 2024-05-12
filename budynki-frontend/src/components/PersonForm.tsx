import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { PersonData } from "@/types/PersonData";

interface PersonOptionalData {
  pesel?: number;
  imieINazwisko?: string;
  najmujacy?: boolean;
}

const formSchema = z.object({
  pesel: z
    .string()
    .min(11, { message: "Wprowadź poprawny pesel" })
    .max(11, { message: "Wprowadź poprawny pesel" })
    .refine(
      (value) => {
        const numericValue = Number(value);
        return !isNaN(numericValue);
      },
      {
        message: "Wprowadź poprawny pesel",
      },
    ),
  imie: z.string().min(1, { message: "Wprowadź poprawne imię" }),
  nazwisko: z.string().min(1, { message: "Wprowadź poprawne nazwisko" }),
  najmujacy: z.coerce.boolean(),
});

export default function PersonForm(person: PersonOptionalData) {
  const personDefaults = person.pesel
    ? {
        imie: person.imieINazwisko?.split(",")[0]?.trim() || "",
        nazwisko: person.imieINazwisko?.split(",")[1]?.trim() || "",
        najmujacy: person.najmujacy || false,
        pesel: person.pesel.toString() || "",
      }
    : { imie: "", nazwisko: "", najmujacy: false, pesel: "" };
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: personDefaults,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const newOsoba: PersonData = await fetch(
      `http://localhost:8080/api/osoby/${values.pesel}`,
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          imieINazwisko: `${values.imie}, ${values.nazwisko}`,
          najmujacy: values.najmujacy,
        }),
      },
    ).then((response) => response.json());
    setLoading(false);
    if (newOsoba.pesel) {
      toast(
        <div>
          <div>Pesel: {newOsoba.pesel}</div>
          <div>Imie i nazwisko: {newOsoba.imieINazwisko}</div>
          <div>Najmujacy: {newOsoba.najmujacy ? "Tak" : "Nie"}</div>
        </div>,
      );
    } else {
      toast(<span className="text-red-700">Error!</span>);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Typography variant="h3">{`Osoby`}</Typography>
        <FormField
          control={form.control}
          name="imie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię:</FormLabel>
              <FormControl>
                <Input
                  placeholder={person.pesel ? personDefaults.imie : "Imię"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nazwisko"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko:</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    person.pesel ? personDefaults.nazwisko : "Nazwisko"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pesel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer PESEL:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={person.pesel ? personDefaults.pesel : "PESEL"}
                  {...field}
                  disabled={person.pesel ? true : false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="najmujacy"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-y-0 space-x-2">
                <FormLabel>Wynajmujący:</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </div>
              {person.pesel ? (
                <FormDescription>
                  Aktualnie{" "}
                  {personDefaults.najmujacy ? "wynajmujący" : "nie wynajmujący"}
                  .
                </FormDescription>
              ) : (
                <></>
              )}
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Edytuj
          </Button>
        ) : (
          <Button type="submit">Edytuj</Button>
        )}
      </form>
    </Form>
  );
}
