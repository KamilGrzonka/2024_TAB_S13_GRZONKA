import { RegistrationFormKeys } from "@/types/FormKeys";
import { formDefiner, optionDataToLabel } from "../FormDefiner";
import { ApartmentData, PersonData, RegistrationData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";
import { z } from "zod";
import { zNonNegative, zNumber } from "../zodWrapper";

interface RegistrationFormEntityData {
  registration?: RegistrationData;
  apartments: ApartmentData[];
  persons: PersonData[];
}

interface RegistrationFormArgs {
  entityData: RegistrationFormEntityData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    meldunekId?: number | string;
  };
}

export function registrationForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: RegistrationFormArgs) {
  return formDefiner<RegistrationFormKeys>(
    {
      dataMeldunku: z.coerce.date(), // nullable = false
      dataWymeldowania: z.coerce.date().optional(),
      osobaId: zNumber().pipe(zNonNegative()), // nullable = false
      mieszkanieId: zNumber().pipe(zNonNegative()), // nullable = false
    },
    {
      dataMeldunku: {
        type: "DATEPICKER",
        defaultValue: entityData.registration?.dataMeldunku,
        options: [],
      },
      dataWymeldowania: {
        type: "DATEPICKER",
        defaultValue: entityData.registration?.dataWymeldowania,
        options: [],
      },
      osobaId: {
        type: "SELECT",
        defaultValue: entityData.registration?.osobaId,
        options: optionDataToLabel(["imie", "nazwisko", "pesel"], entityData.persons),
      },
      mieszkanieId: {
        type: "SELECT",
        defaultValue: entityData.registration?.mieszkanieId,
        options: optionDataToLabel(["numerMieszkania"], entityData.apartments, {numerMieszkania: "mieszkanie nr.: "}),
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
