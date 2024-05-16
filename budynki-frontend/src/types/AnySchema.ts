import { apartmentFormSchema } from "@/components/forms/apartment/apartmentFormSchema";
import { buildingFormSchema } from "@/components/forms/building/buildingFormSchema";
import { personFormSchema } from "@/components/forms/person/personFormSchema";

export type AnySchema = typeof apartmentFormSchema | typeof buildingFormSchema | typeof personFormSchema