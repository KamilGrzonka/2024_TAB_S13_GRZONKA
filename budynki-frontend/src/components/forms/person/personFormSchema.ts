import { PersonData } from "@/types/Entities";
import { PersonFormKeys } from "@/types/FormKeys";
import { HttpMethods } from "@/types/HttpMethods";
import { formDefiner } from "../FormDefiner";
import {
  zNumber,
  zNumberMinMaxDigits,
  zStringMinMax,
  polishChars,
} from "../zodWrapper";

interface PersonFormArgs {
  entityData?: PersonData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    osobaId?: number | string;
  };
}

export function personForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: PersonFormArgs) {
  return formDefiner<PersonFormKeys>(
    {
      pesel: zNumber().pipe(zNumberMinMaxDigits({min: 11, max: 11})), // length = 11, nullable = false, unique = true
      imie: zStringMinMax({ max: 40 }).regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne imię"), // length = 40, nullable = false
      nazwisko: zStringMinMax({ max: 40 }).regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne nazwisko"), // length = 40, nullable = false
    },
    {
      pesel: {
        type: "INPUT",
        defaultValue: `${entityData?.pesel || ""}`,
        options: [],
      },
      imie: {
        type: "INPUT",
        defaultValue: `${entityData?.imie || ""}`,
        options: [],
      },
      nazwisko: {
        type: "INPUT",
        defaultValue: `${entityData?.nazwisko || ""}`,
        options: [],
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
