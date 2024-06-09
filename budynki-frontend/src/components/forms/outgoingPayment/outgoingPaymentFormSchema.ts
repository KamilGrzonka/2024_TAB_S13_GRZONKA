import { OutgoingPaymentFormKeys } from "@/types/FormKeys";
import {
  zDate,
  zNonNegative,
  zNumber,
  zNumberPrecisionScale,
} from "../zodWrapper";
import { formDefiner, optionDataToLabel } from "../FormDefiner";
import { PaymentData, TaskData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";

interface OutgoingPaymentFormEntityData {
  payment?: PaymentData;
  tasks: TaskData[];
}

interface OutgoingPaymentFormArgs {
  entityData: OutgoingPaymentFormEntityData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    platnoscId?: number | string;
  };
}

export function outgoingPaymentForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: OutgoingPaymentFormArgs) {
  return formDefiner<OutgoingPaymentFormKeys>(
    {
      dataZrealizowania: zDate(), // nullable = false
      wartosc: zNumber().pipe(zNonNegative()).pipe(zNumberPrecisionScale()), // scale = 2, precision = 10, nullable = false
      zadanieId: zNumber().pipe(zNonNegative()),
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
      zadanieId: {
        type: "SELECT",
        defaultValue: entityData.payment?.zadanieId,
        options: optionDataToLabel(["id"], entityData.tasks),
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
