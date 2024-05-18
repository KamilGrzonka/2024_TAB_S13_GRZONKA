import { ApartmentFormKeys } from "@/components/forms/apartment/apartmentFormSchema";
import { BuildingFormKeys } from "@/components/forms/building/buildingFormSchema";
import { PriceListFormKeys } from "@/components/forms/priceList/PriceListFormSchema";
import { PersonFormKeys } from "@/components/forms/person/personFormSchema";

export type AnyFormKeys = ApartmentFormKeys | BuildingFormKeys | PersonFormKeys | PriceListFormKeys;