import { ApartmentFormSchema } from "@/components/forms/apartment/apartmentFormSchema";
import { BuildingFormSchema } from "@/components/forms/building/buildingFormSchema";
import { PersonFormSchema } from "@/components/forms/person/personFormSchema";

export type AnySchema = ApartmentFormSchema | BuildingFormSchema | PersonFormSchema;