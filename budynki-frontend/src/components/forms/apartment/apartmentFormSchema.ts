import { ApartmentFormKeys } from "@/types/FormKeys";
import { zNonNegative, zNumber, zPositive, zStringMinMax } from "../zodWrapper";
import { formDefiner } from "../FormDefiner";
import { ApartmentData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";

interface ApartmentFormArgs {
  entityData?: ApartmentData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields: {
    budynekId: number | string;
    apartmentId?: number | string;
  };
}

export function apartmentForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: ApartmentFormArgs) {
  return formDefiner<ApartmentFormKeys>(
    {
      numerMieszkania: zNumber().pipe(zPositive()), // nullable = false
      pietro: zNumber().pipe(zNonNegative()), // nullable = false
      liczbaMieszkancow: zNumber().pipe(zNonNegative()), // nullable = false
      opis: zStringMinMax({ min: 0, max: 65535 }).optional(), // length = 65535
    },
    {
      numerMieszkania: {
        type: "INPUT",
        defaultValue: entityData?.numerMieszkania,
        options: [],
      },
      pietro: {
        type: "INPUT",
        defaultValue: entityData?.pietro,
        options: [],
      },
      liczbaMieszkancow: {
        type: "INPUT",
        defaultValue: entityData?.liczbaMieszkancow,
        options: [],
      },
      opis: {
        type: "TEXTAREA",
        defaultValue: entityData?.opis,
        options: [],
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
