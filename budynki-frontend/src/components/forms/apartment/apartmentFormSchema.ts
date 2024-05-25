import { ApartmentFormKeys } from "@/types/FormKeys";
import { zNonNegative, zNumber, zOptional, zPositive, zStringMinMax } from "../zodWrapper";
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
      opis: zOptional(zStringMinMax({ max: 65535 })), // length = 65535
    },
    {
      numerMieszkania: {
        type: "INPUT_NUMBER",
        defaultValue: entityData?.numerMieszkania,
        options: [],
      },
      pietro: {
        type: "INPUT_NUMBER",
        defaultValue: entityData?.pietro,
        options: [],
      },
      liczbaMieszkancow: {
        type: "INPUT_NUMBER",
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
