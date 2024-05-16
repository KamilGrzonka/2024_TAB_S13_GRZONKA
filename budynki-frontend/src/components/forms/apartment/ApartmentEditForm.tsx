import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import FormPopulator from "../FormPopulator";
import { apartmentFormSchema } from "./apartmentFormSchema";
import { ApartmentData } from "@/types/ApartmentData";
import { fetchBackendApi, putBackendApi } from "../../fetchBackendApi";
import { toastEntity } from "../../toastEntity";
import { toast } from "sonner";
import { Form } from "../../ui/form";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

export default function ApartmentEditForm() {
  const { buildingId, apartmentId } = useParams();
  const apartment = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => fetchBackendApi<ApartmentData>(`/mieszkania/${apartmentId}`),
  });

  const form = useForm<z.infer<typeof apartmentFormSchema>>({
    resolver: zodResolver(apartmentFormSchema),
    mode: "onChange",
    defaultValues: {
      numerMieszkania: undefined,
      pietro: undefined,
      liczbaMieszkancow: undefined,
      opis: undefined,
    },
  });

  useEffect(() => {
    if (apartment.isSuccess) {
      form.reset({
        numerMieszkania: apartment.data?.numerMieszkania,
        pietro: apartment.data?.pietro,
        liczbaMieszkancow: apartment.data?.liczbaMieszkancow,
        opis: apartment.data?.opis,
      });
    }
  }, [apartment.data, apartment.isSuccess, form]);

  if (apartment.isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  } else if (apartment.isError) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-red-700">Error!</span>
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof apartmentFormSchema>) {
    try {
      const newApartment: ApartmentData = await putBackendApi(
        `/mieszkania/${apartmentId}`,
        {
          id: 0,
          numerMieszkania: values.numerMieszkania,
          pietro: values.pietro,
          liczbaMieszkancow: values.liczbaMieszkancow,
          opis: values.opis,
          budynekId: Number(buildingId),
        },
      );
      toastEntity(newApartment, "Dodano wpis");
    } catch (error) {
      error instanceof Error && toast.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormPopulator buttonLabel="Dodaj" />
      </form>
    </Form>
  );
}
