import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { PersonData } from "@/types/PersonData";
import { useNavigate } from "react-router-dom";

interface PersonOptionalData {
  pesel?: number;
  imie?: string;
  nazwisko?: string;
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
});

export default function PersonForm(person: PersonOptionalData) { //ToDo pozbyć się tego nieczytelnego monstrum
  const navigate = useNavigate();
  const personDefaults = person.pesel
    ? {
        imie: person.imie || "",
        nazwisko: person.nazwisko || "",
        pesel: person.pesel.toString() || "",
      }
    : { imie: "", nazwisko: "", pesel: "" };
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
          imie: values.imie,
          nazwisko: values.nazwisko
        }),
      },
    ).then((response) => response.json());
    setLoading(false);
    if (newOsoba.pesel) {
      toast(
        <div>
          <div>Pesel: {newOsoba.pesel}</div>
          <div>Imię: {newOsoba.imie}</div>
          <div>Nazwisko: {newOsoba.nazwisko}</div>
        </div>,
      );
      navigate("..", {relative: "path"});
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
        {isLoading ? (
          <Button disabled className="bg-blue-500">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            {person.pesel ? <>Edytuj</> : <>Dodaj</>}
          </Button>
        ) : (
          <Button className="bg-blue-500" type="submit">{person.pesel ? <>Edytuj</> : <>Dodaj</>}</Button>
        )}
      </form>
    </Form>
  );
}
