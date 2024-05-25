import { CompanyFormKeys } from "@/types/FormKeys";
import {
  polishChars,
  zNumber,
  zNumberMinMaxDigits,
  zStringMinMax,
} from "../zodWrapper";
import { formDefiner } from "../FormDefiner";
import { CompanyData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";

interface CompanyFormArgs {
  entityData?: CompanyData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    firmaId?: number | string;
  };
}

export function companyForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: CompanyFormArgs) {
  return formDefiner<CompanyFormKeys>(
    {
      nazwa: zStringMinMax({ max: 100 }), // length = 100, nullable = false
      nip: zNumber().pipe(zNumberMinMaxDigits({ min: 10, max: 10 })), // length = 10, nullable = false, unique = true
      ulica: zStringMinMax({ max: 80 }), // length = 80, nullable = false
      numerBudynku: zStringMinMax({ max: 5 }).regex(
        RegExp(`^\\d+[${polishChars}]?$`),
        "Wprowadź poprawny numer budynku",
      ), // length = 5, nullable = false
      numerLokalu: zStringMinMax({ max: 5 })
        .regex(
          RegExp(`^\\d+[${polishChars}]?$`),
          "Wprowadź poprawny numer lokalu",
        )
        .optional(), // length = 5
      kodPocztowy: zStringMinMax({ min: 6, max: 6 }).regex(
        /^\d{2}-\d{3}$/,
        "Wprowadź poprawny kod pocztowy",
      ), // length = 6, nullable = false
      miasto: zStringMinMax().regex(
        RegExp(`^[${polishChars} -]+$`),
        "Wprowadź poprawne miasto",
      ), // length = 80, nullable = false
    },
    {
      nazwa: {
        type: "INPUT",
        defaultValue: entityData?.nazwa,
        options: [],
      },
      nip: {
        type: "INPUT_NUMBER",
        defaultValue: entityData?.nip,
        options: [],
      },
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
      numerLokalu: {
        type: "INPUT",
        defaultValue: entityData?.numerLokalu,
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
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
