import { BuildingFormKeys } from "@/types/FormKeys";
import { HttpMethods } from "@/types/HttpMethods";
import { formDefiner } from "../FormDefiner";
import {
  zStringMinMax,
  polishChars,
  zNumber,
  zNonNegative,
} from "../zodWrapper";
import { BuildingData } from "@/types/Entities";

interface BuildingFormArgs {
  entityData?: BuildingData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    budynekId?: number | string;
  };
}

export function buildingForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: BuildingFormArgs) {
  return formDefiner<BuildingFormKeys>(
    {
      ulica: zStringMinMax(), // length = 80, nullable = false
      numerBudynku: zStringMinMax({ max: 5 }).regex(
        RegExp(`^\\d+[${polishChars}]?$`),
        "Wprowadź poprawny numer budynku",
      ), // length = 5, nullable = false
      kodPocztowy: zStringMinMax({ min: 6, max: 6 }).regex(
        /^\d{2}-\d{3}$/,
        "Wprowadź poprawny kod pocztowy",
      ), // length = 6, nullable = false
      miasto: zStringMinMax().regex(
        RegExp(`^[${polishChars} -]+$`),
        "Wprowadź poprawne miasto",
      ), // length = 80, nullable = false
      liczbaMiejsc: zNumber().pipe(zNonNegative()), // nullable = false
    },
    {
      ulica: {
        type: "INPUT",
        defaultValue: entityData?.ulica,
        options: [],
      },
      numerBudynku: {
        type: "INPUT",
        defaultValue: entityData?.numerBudynku,
        options: [],
      },
      kodPocztowy: {
        type: "INPUT",
        defaultValue: entityData?.kodPocztowy,
        options: [],
      },
      miasto: {
        type: "INPUT",
        defaultValue: entityData?.miasto,
        options: [],
      },
      liczbaMiejsc: {
        type: "INPUT_NUMBER",
        defaultValue: entityData?.liczbaMiejsc,
        options: [],
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
