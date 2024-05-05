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

interface BuildingData {
  numberBudynku: number;
  adres: string;
  liczbaMiejsc: number;
}

const formSchema = z.object({
  adres: z.string().min(1).max(150),
  liczba: z.coerce
    .number({
      invalid_type_error: "Wprowadź liczbę mieszkań",
    })
    .nonnegative({ message: "Wprowadź liczbę mieszkań" }),
});

export default function NewBuilding() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adres: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const newBuilding: BuildingData = await fetch(
      "http://localhost:8080/api/budynki",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          adres: values.adres,
          liczbaMiejsc: values.liczba,
        }),
      },
    ).then((response) => response.json());
    setLoading(false);
    if (newBuilding.numberBudynku) {
      toast(
        <div>
          <div>Numer budynku: {newBuilding.numberBudynku}</div>
          <div>Adres budynku: {newBuilding.adres}</div>
          <div>Liczba mieszkań: {newBuilding.liczbaMiejsc}</div>
        </div>,
      );
    } else {
      toast(<span className="text-red-700">Error!</span>);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>Dodaj budynek</div>
        <FormField
          control={form.control}
          name="adres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres budynku:</FormLabel>
              <FormControl>
                <Input placeholder="Adres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="liczba"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Liczba mieszkań:</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Liczba" {...field} />
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
