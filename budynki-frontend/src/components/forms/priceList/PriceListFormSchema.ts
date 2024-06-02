import { PriceListData } from "@/types/Entities";
import { PriceListFormKeys } from "@/types/FormKeys";
import { HttpMethods } from "@/types/HttpMethods";
import { formDefiner, priceListsToDatesRange } from "../FormDefiner";
import {
  zNumber,
  zNonNegative,
  zDate,
  zNumberPrecisionScale,
} from "../zodWrapper";

interface PriceListFormEntityData {
  priceList?: PriceListData;
  priceLists: PriceListData[];
}

interface PriceListFormArgs {
  entityData: PriceListFormEntityData;
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
      cena: zNumber().pipe(zNonNegative()).pipe(zNumberPrecisionScale()), // scale = 2, precision = 10, nullable = false
    },
    {
      dataPoczatkowa: {
        type: "DATEPICKER",
        defaultValue: entityData.priceList?.dataPoczatkowa,
        options: [],
        datePickerLimits: {
          maxField: "dataKoncowa",
          ranges: priceListsToDatesRange(entityData.priceLists),
        },
      },
      dataKoncowa: {
        type: "DATEPICKER",
        defaultValue: entityData.priceList?.dataKoncowa,
        options: [],
        datePickerLimits: {
          minField: "dataPoczatkowa",
          ranges: priceListsToDatesRange(
            entityData.priceLists,
            entityData.priceList,
          ),
        },
      },
      cena: {
        type: "INPUT_NUMBER",
        defaultValue: entityData.priceList?.cena,
        options: [],
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
