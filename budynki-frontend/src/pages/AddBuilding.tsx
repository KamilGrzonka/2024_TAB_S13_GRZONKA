import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Box, Container, Typography } from "@mui/material";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BuildingData } from "@/types/BuildingData.ts";

const formSchema = z.object({
  ulica: z.string().min(1, { message: "Wprowadź poprawną ulicę" }),
  numer: z.coerce
    .number({ invalid_type_error: "Wprowadź poprawny numer domu" })
    .positive({ message: "Wprowadź poprawny numer domu" }),
  kod: z.string().regex(/^\d{2}-\d{3}$/, "Wprowadź poprawny kod pocztowy"),
  miejscowosc: z.string().min(1, { message: "Wprowadź poprawną miejscowość" }),
  liczba: z.coerce
    .number({
      invalid_type_error: "Wprowadź poprawną liczbę mieszkań",
    })
    .nonnegative({ message: "Wprowadź poprawną liczbę mieszkań" }),
});

export default function AddBuilding() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ulica: "",
      kod: "",
      miejscowosc: "",
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
          ulica: values.ulica,
          numerBudynku: values.numer,
          kodPocztowy: values.kod,
          miasto: values.miejscowosc,
          liczbaMiejsc: values.liczba,
        }),
      },
    ).then((response) => response.json());
    setLoading(false);
    if (newBuilding.numerBudynku) {
      toast(
        <div>
          <div>Id budynku: {newBuilding.id}</div>
          <div>Adres budynku: {`${newBuilding.numerBudynku} ${newBuilding.ulica}, ${newBuilding.kodPocztowy} ${newBuilding.miasto}`}</div>
          <div>Liczba mieszkań: {newBuilding.liczbaMiejsc}</div>
        </div>,
      );
    } else {
      toast(<span className="text-red-700">Error!</span>);
    }
  }

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "fixed-inline",
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
        }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-auto"
          >
            <Typography variant="h3">{`Budynki`}</Typography>
            <FormField
              control={form.control}
              name="ulica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ulica:</FormLabel>
                  <FormControl>
                    <Input placeholder="Ulica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer budynku:</FormLabel>
                  <FormControl>
                    <Input placeholder="Numer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kod pocztowy:</FormLabel>
                  <FormControl>
                    <Input placeholder="Kod" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="miejscowosc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miejscowość:</FormLabel>
                  <FormControl>
                    <Input placeholder="Miejscowość" {...field} />
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
            <Box sx={{ textAlign: "center" }}>
              {isLoading ? (
                <Button disabled>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Dodaj
                </Button>
              ) : (
                <Button type="submit">Dodaj</Button>
              )}
            </Box>
          </form>
        </Form>
      </Box>
    </Container>
  );
}
