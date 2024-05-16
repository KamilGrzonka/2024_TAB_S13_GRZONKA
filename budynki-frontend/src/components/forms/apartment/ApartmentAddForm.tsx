import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import FormPopulator from "../FormPopulator";
import { apartmentFormSchema } from "./apartmentFormSchema";
import { ApartmentData } from "@/types/ApartmentData";
import { postBackendApi } from "../../fetchBackendApi";
import { toastEntity } from "../../toastEntity";
import { toast } from "sonner";
import { Form } from "../../ui/form";

export default function ApartmentAddForm() {
  const { buildingId } = useParams();

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

  async function onSubmit(values: z.infer<typeof apartmentFormSchema>) {
    try {
      const newApartment: ApartmentData = await postBackendApi("/mieszkania", {
        id: 0,
        numerMieszkania: values.numerMieszkania,
        pietro: values.pietro,
        liczbaMieszkancow: values.liczbaMieszkancow,
        opis: values.opis,
        budynekId: Number(buildingId),
      });
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
