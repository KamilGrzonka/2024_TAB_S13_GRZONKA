import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PersonData {
  pesel: number;
  imieINazwisko: string;
  najmujacy: boolean;
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
  najmujacy: z.string().regex(/^(Tak|Nie)$/i, { message: "Tak lub Nie" }),
});

export default function EditPerson() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imie: "",
      nazwisko: "",
      najmujacy: "",
      pesel: "",
    },
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
          imieINazwisko: `${values.imie} ${values.nazwisko}`,
          najmujacy: values.najmujacy.toLowerCase() === "tak",
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
        <div>Dodaj osobę</div>
        <FormField
          control={form.control}
          name="imie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię:</FormLabel>
              <FormControl>
                <Input placeholder="Imię" {...field} />
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
                <Input placeholder="Nazwisko" {...field} />
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
                <Input type="number" placeholder="PESEL" {...field} />
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
              <FormLabel>Wynajmujący:</FormLabel>
              <FormControl>
                <Input placeholder="Wynajmujący" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Dodaj
          </Button>
        ) : (
          <Button type="submit">Dodaj</Button>
        )}
      </form>
    </Form>
  );
}
