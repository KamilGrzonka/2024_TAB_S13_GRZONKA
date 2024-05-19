import { PriceListData } from "@/types/Entities";
import { PriceListFormKeys } from "@/types/FormKeys";
import { HttpMethods } from "@/types/HttpMethods";
import { z } from "zod";
import { formDefiner } from "../FormDefiner";
import { zNumber, zNonNegative } from "../zodWrapper";

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
      dataPoczatkowa: z.coerce.date(), // nullable = false
      dataKoncowa: z.coerce.date(), // nullable = false
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
