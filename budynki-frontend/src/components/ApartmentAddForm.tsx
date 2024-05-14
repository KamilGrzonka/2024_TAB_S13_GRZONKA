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
import { ApartmentData } from "@/types/ApartmentData";
import { useNavigate, useParams } from "react-router-dom";

interface ApartmentOptionalData {
  numerMieszkania?: number;
  pietro?: number;
  liczbaOsob?: number;
  opis?: string;
}

const formSchema = z.object({
  numerMieszkania: z.string().refine(
    (value) => {
      const numericValue = Number(value);
      return !isNaN(numericValue) && numericValue > 0;
    },
    {
      message: "Wprowadź poprawny numer mieszkania",
    },
  ),
  pietro: z
    .string()
    .min(1, {
      message: "Wprowadź poprawne piętro",
    })
    .refine(
      (value) => {
        const numericValue = Number(value);
        return !isNaN(numericValue) && numericValue >= 0;
      },
      {
        message: "Wprowadź poprawne piętro",
      },
    ),
  liczbaOsob: z
    .string()
    .min(1, {
      message: "Wprowadź poprawną liczbę osób",
    })
    .refine(
      (value) => {
        const numericValue = Number(value);
        return !isNaN(numericValue) && numericValue >= 0;
      },
      {
        message: "Wprowadź poprawną liczbę osób",
      },
    ),
  opis: z.string().min(1, { message: "Wprowadź poprawny opis" }),
});

export default function ApartmentAddForm(apartment: ApartmentOptionalData) {
  const navigate = useNavigate();
  const { buildingId } = useParams();
  //ToDo pozbyć się tego nieczytelnego monstrum
  const apartmentDefaults = apartment.numerMieszkania
    ? {
        numerMieszkania: apartment.numerMieszkania.toString() || "",
        pietro: apartment.pietro?.toString() || "",
        liczbaOsob: apartment.liczbaOsob?.toString() || "",
        opis: apartment.opis?.toString() || "",
      }
    : { numerMieszkania: "", pietro: "", liczbaOsob: "", opis: "" };
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: apartmentDefaults,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const newApartment: ApartmentData = await fetch(
      `http://localhost:8080/api/mieszkania`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          numerMieszkania: values.numerMieszkania,
          pietro: values.pietro,
          liczbaMieszkancow: values.liczbaOsob,
          opis: values.opis,
          budynekId: buildingId,
        }),
      },
    ).then((response) => response.json());
    setLoading(false);
    if (newApartment.numerMieszkania) {
      toast(
        <div>
          <div>Numer mieszkania: {newApartment.numerMieszkania}</div>
          <div>Pietro: {newApartment.pietro}</div>
          <div>Liczba osób: {newApartment.liczbaMieszkancow}</div>
          <div>Opis: {newApartment.opis}</div>
          <div>Numer budynku: {newApartment.budynekId}</div>
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
        <Typography variant="h3">{`Mieszkania`}</Typography>
        <FormField
          control={form.control}
          name="numerMieszkania"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer mieszkania:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={
                    apartment.numerMieszkania
                      ? apartmentDefaults.numerMieszkania
                      : "Numer"
                  }
                  {...field}
                  disabled={apartment.numerMieszkania ? true : false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pietro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Piętro:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={
                    apartment.pietro ? apartmentDefaults.pietro : "Piętro"
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
          name="liczbaOsob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Liczba osob:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={
                    apartment.liczbaOsob
                      ? apartmentDefaults.liczbaOsob
                      : "Liczba"
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
          name="opis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis:</FormLabel>
              <FormControl>
                <Input
                  placeholder={apartment.opis ? apartmentDefaults.opis : "Opis"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled className="bg-blue-500">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            {apartment.numerMieszkania ? <>Edytuj</> : <>Dodaj</>}
          </Button>
        ) : (
          <Button className="bg-blue-500" type="submit">{apartment.numerMieszkania ? <>Edytuj</> : <>Dodaj</>}</Button>
        )}
      </form>
    </Form>
  );
}
