import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import { CompanyData, TaskData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { taskForm } from "./taskFormSchema";

export function TaskFormAdd() {
  const { repairId } = useParams();
  const companies = useQuery({
    queryKey: ["companies"],
    queryFn: () => getBackendApi<CompanyData[]>(`/firmy`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie zadania</h2>
      <LoadingComponent queryResult={companies}>
        <FormGenerator
          formDefiner={taskForm({
            endpoint: `/zadania`,
            method: "POST",
            entityData: {
              companies: companies.data!,
            },
            additionalSubmitFields: {
              zgloszenieId: `${repairId}`,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}

export function TaskFormEdit() {
  const { repairId, taskId } = useParams();
  const companies = useQuery({
    queryKey: ["companies"],
    queryFn: () => getBackendApi<CompanyData[]>(`/firmy`),
  });
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getBackendApi<TaskData>(`/zadania/${taskId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie zadania</h2>
      <LoadingComponent queryResult={[query, companies]}>
        <FormGenerator
          formDefiner={taskForm({
            endpoint: `/zadania/${taskId}`,
            method: "PUT",
            entityData: {
              companies: companies.data!,
              task: query.data,
            },
            additionalSubmitFields: {
              zadanieId: `${taskId}`,
              zgloszenieId: `${repairId}`,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}
