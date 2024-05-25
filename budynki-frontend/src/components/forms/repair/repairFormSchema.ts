import { RepairFormKeys } from "@/types/FormKeys";
import { formDefiner, optionDataToLabel } from "../FormDefiner";
import { ApartmentData, BuildingData, PersonData, RepairData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";
import { z } from "zod";
import { zNonNegative, zNumber } from "../zodWrapper";
import { RepairStatus } from "@/types/enums/RepairStatus";
import { RepairType } from "@/types/enums/RepairType";

interface RepairFormEntityData {
  repair?: RepairData;
  persons: PersonData[];
  buildings: BuildingData[];
  apartments: ApartmentData[];
}

interface RepairFormArgs {
  entityData: RepairFormEntityData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    meldunekId?: number | string;
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
      dataZgloszenia: z.coerce.date(), // nullable = false
      dataWykonania: z.coerce.date().optional(),
      statusZgloszenia: z.enum([
        RepairStatus.W_TRAKCIE,
        RepairStatus.ZAKONCZONE,
        RepairStatus.ZGLOSZONE,
      ]), // nullable = false
      typZgloszenia: z.enum([RepairType.REMONT, RepairType.USTERKA]), // nullable = false
      kosztCalkowity: zNumber().pipe(zNonNegative()).optional(), // scale = 2, precision = 10
      priorytet: zNumber(), // nullable = false
      osobaId: zNumber().pipe(zNonNegative()).optional(),
      mieszkanieId: zNumber().pipe(zNonNegative()).optional(),
      budynekId: zNumber().pipe(zNonNegative()).optional(),
    },
    {
      dataZgloszenia: {
        type: "DATEPICKER",
        defaultValue: entityData.repair?.dataZgloszenia,
        options: [],
      },
      dataWykonania: {
        type: "DATEPICKER",
        defaultValue: entityData.repair?.dataWykonania,
        options: [],
      },
      statusZgloszenia: {
        type: "RADIO",
        defaultValue: entityData.repair?.statusZgloszenia,
        options: [{id: RepairStatus.ZGLOSZONE, label: "Zgłoszone"}, {id: RepairStatus.W_TRAKCIE, label: "W trakcie"}, {id: RepairStatus.ZAKONCZONE, label: "Zakończone"}],
      },
      typZgloszenia: {
        type: "RADIO",
        defaultValue: entityData.repair?.typZgloszenia,
        options: [{id: RepairType.REMONT, label: "Remont"}, {id: RepairType.USTERKA, label: "Usterka"}],
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
        options: optionDataToLabel(["imie", "nazwisko", "pesel"], entityData.persons),
      },
      budynekId: {
        type: "SELECT",
        defaultValue: entityData.repair?.budynekId,
        options: optionDataToLabel(["numerBudynku", "ulica", "miasto"], entityData.buildings),
      },
      mieszkanieId: {
        type: "SELECT",
        defaultValue: entityData.repair?.mieszkanieId,
        options: optionDataToLabel(["numerMieszkania"], entityData.apartments, {numerMieszkania: "mieszkanie nr.: "}),
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
