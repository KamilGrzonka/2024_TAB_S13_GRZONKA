import { IncomingPaymentFormKeys } from "@/types/FormKeys";
import {
  zDate,
  zNonNegative,
  zNumber,
  zNumberPrecisionScale,
} from "../zodWrapper";
import { formDefiner, optionDataToLabel } from "../FormDefiner";
import { PaymentData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";
import { RegistrationDisplay } from "@/types/EntitiesDisplayHelpers";

interface IncomingPaymentFormEntityData {
  payment?: PaymentData;
  registrations: RegistrationDisplay[];
}

interface IncomingPaymentFormArgs {
  entityData: IncomingPaymentFormEntityData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    platnoscId?: number | string;
  };
}

export function incomingPaymentForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: IncomingPaymentFormArgs) {
  return formDefiner<IncomingPaymentFormKeys>(
    {
      dataZrealizowania: zDate(), // nullable = false
      wartosc: zNumber().pipe(zNonNegative()).pipe(zNumberPrecisionScale()), // scale = 2, precision = 10, nullable = false
      meldunekId: zNumber().pipe(zNonNegative()),
    },
    {
      dataZrealizowania: {
        type: "DATEPICKER",
        defaultValue: entityData.payment?.dataZrealizowania,
        options: [],
      },
      wartosc: {
        type: "INPUT_NUMBER",
        defaultValue: entityData.payment?.wartosc,
        options: [],
      },
      meldunekId: {
        type: "SELECT",
        defaultValue: entityData.payment?.meldunekId,
        options: optionDataToLabel(
          "meldunekId",
          ["numerMieszkania", "imie", "nazwisko", "dataMeldunku"],
          entityData.registrations,
          {
            numerMieszkania: "Mieszkanie nr.: ",
          },
        ),
        customLabel: "Meldunek",
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
