import { RepairFormKeys } from "@/types/FormKeys";
import { formDefiner, optionDataToLabel } from "../FormDefiner";
import { ApartmentData, PersonData, RepairData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";
import {
  zDate,
  zEnum,
  zNonNegative,
  zNumber,
  zNumberPrecisionScale,
  zOptional,
} from "../zodWrapper";
import { RepairStatus } from "@/types/enums/RepairStatus";
import { RepairType } from "@/types/enums/RepairType";

interface RepairFormEntityData {
  repair?: RepairData;
  persons: PersonData[];
  apartments: ApartmentData[];
}

interface RepairFormArgs {
  entityData: RepairFormEntityData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    zgloszenieId?: number | string;
    budynekId: number | string;
  };
}

export function repairForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: RepairFormArgs) {
  return formDefiner<RepairFormKeys>(
    {
      dataZgloszenia: zDate(), // nullable = false
      dataWykonania: zOptional(zDate()),
      statusZgloszenia: zEnum({
        enums: [
          RepairStatus.W_TRAKCIE,
          RepairStatus.ZAKONCZONE,
          RepairStatus.ZGLOSZONE,
        ],
      }), // nullable = false
      typZgloszenia: zEnum({ enums: [RepairType.REMONT, RepairType.USTERKA] }), // nullable = false
      kosztCalkowity: zOptional(
        zNumber().pipe(zNonNegative()).pipe(zNumberPrecisionScale()),
      ), // scale = 2, precision = 10
      priorytet: zNumber(), // nullable = false
      osobaId: zOptional(zNumber().pipe(zNonNegative())),
      mieszkanieId: zOptional(zNumber().pipe(zNonNegative())),
    },
    {
      dataZgloszenia: {
        type: "DATEPICKER",
        defaultValue: entityData.repair?.dataZgloszenia,
        options: [],
        datePickerLimits: { maxField: "dataWykonania" },
      },
      dataWykonania: {
        type: "DATEPICKER",
        defaultValue: entityData.repair?.dataWykonania,
        options: [],
        datePickerLimits: { minField: "dataZgloszenia" },
      },
      statusZgloszenia: {
        type: "RADIO",
        defaultValue:
          entityData.repair?.statusZgloszenia || RepairStatus.ZGLOSZONE,
        options: [
          { id: RepairStatus.ZGLOSZONE, label: "Zgłoszone" },
          { id: RepairStatus.W_TRAKCIE, label: "W trakcie" },
          { id: RepairStatus.ZAKONCZONE, label: "Zakończone" },
        ],
        customLabel: "Status Zgłoszenia",
      },
      typZgloszenia: {
        type: "RADIO",
        defaultValue: entityData.repair?.typZgloszenia || RepairType.REMONT,
        options: [
          { id: RepairType.REMONT, label: "Remont" },
          { id: RepairType.USTERKA, label: "Usterka" },
        ],
        customLabel: "Typ Zgłoszenia",
      },
      kosztCalkowity: {
        type: "INPUT_NUMBER",
        defaultValue: entityData.repair?.kosztCalkowity,
        options: [],
      },
      priorytet: {
        type: "INPUT_NUMBER",
        defaultValue: entityData.repair?.priorytet,
        options: [],
      },
      osobaId: {
        type: "SELECT",
        defaultValue: entityData.repair?.osobaId,
        options: optionDataToLabel(
          ["imie", "nazwisko", "pesel"],
          entityData.persons,
        ),
      },
      mieszkanieId: {
        type: "SELECT",
        defaultValue: entityData.repair?.mieszkanieId,
        options: optionDataToLabel(["numerMieszkania"], entityData.apartments, {
          numerMieszkania: "mieszkanie nr.: ",
        }),
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
