import { PriceListData } from "@/types/Entities";
import { PriceListFormKeys } from "@/types/FormKeys";
import { HttpMethods } from "@/types/HttpMethods";
import { formDefiner } from "../FormDefiner";
import { zNumber, zNonNegative, zDate } from "../zodWrapper";

interface PriceListFormArgs {
  entityData?: PriceListData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields: {
    mieszkanieId: number | string;
    cennikId?: number | string;
  };
}

export function priceListForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: PriceListFormArgs) {
  return formDefiner<PriceListFormKeys>(
    {
      dataPoczatkowa: zDate(), // nullable = false
      dataKoncowa: zDate(), // nullable = false
      cena: zNumber().pipe(zNonNegative()), // scale = 2, precision = 10, nullable = false
    },
    {
      dataPoczatkowa: {
        type: "DATEPICKER",
        defaultValue: entityData?.dataPoczatkowa,
        options: [],
      },
      dataKoncowa: {
        type: "DATEPICKER",
        defaultValue: entityData?.dataKoncowa,
        options: [],
      },
      cena: {
        type: "INPUT_NUMBER",
        defaultValue: entityData?.cena,
        options: [],
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
