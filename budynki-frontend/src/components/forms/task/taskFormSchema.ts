import { TaskFormKeys } from "@/types/FormKeys";
import { formDefiner, optionDataToLabel } from "../FormDefiner";
import { CompanyData, TaskData } from "@/types/Entities";
import { HttpMethods } from "@/types/HttpMethods";
import {
  zDate,
  zNonNegative,
  zNumber,
  zNumberPrecisionScale,
  zOptional,
  zStringMinMax,
} from "../zodWrapper";

interface TaskFormEntityData {
  task?: TaskData;
  companies: CompanyData[];
}

interface TaskFormArgs {
  entityData: TaskFormEntityData;
  endpoint: string;
  method: HttpMethods;
  additionalSubmitFields?: {
    zadanieId?: number | string;
    zgloszenieId: number | string;
  };
}

export function taskForm({
  entityData,
  endpoint,
  method,
  additionalSubmitFields,
}: TaskFormArgs) {
  return formDefiner<TaskFormKeys>(
    {
      koszt: zNumber().pipe(zNonNegative()).pipe(zNumberPrecisionScale()), // scale = 2, precision = 10, nullable = false
      opis: zOptional(zStringMinMax({ max: 65535 })), // length = 65535
      dataRozpoczecia: zDate(), // nullable = false
      dataZakonczenia: zOptional(zDate()),
      firmaId: zOptional(zNumber().pipe(zNonNegative())),
    },
    {
      koszt: {
        type: "INPUT_NUMBER",
        defaultValue: entityData.task?.koszt,
        options: [],
      },
      opis: {
        type: "INPUT",
        defaultValue: entityData.task?.opis,
        options: [],
      },
      dataRozpoczecia: {
        type: "DATEPICKER",
        defaultValue: entityData.task?.dataRozpoczecia,
        options: [],
        datePickerLimits: { maxField: "dataZakonczenia" },
      },
      dataZakonczenia: {
        type: "DATEPICKER",
        defaultValue: entityData.task?.dataZakonczenia,
        options: [],
        datePickerLimits: { minField: "dataRozpoczecia" },
      },
      firmaId: {
        type: "SELECT",
        defaultValue: entityData.task?.firmaId,
        options: optionDataToLabel(
          "id",
          ["nazwa", "nip"],
          entityData.companies,
        ),
        customLabel: "Firma",
      },
    },
    endpoint,
    method,
    additionalSubmitFields,
  );
}
