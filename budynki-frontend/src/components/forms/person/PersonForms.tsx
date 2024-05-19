import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import { PersonData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { personForm } from "./personFormSchema";

export function PersonFormAdd() {
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie osoby</h2>
      <FormGenerator
        formDefiner={personForm({
          endpoint: `/osoby`,
          method: "POST",
        })}
      />
    </>
  );
}

export function PersonFormEdit() {
  const { personId } = useParams();
  const query = useQuery({
    queryKey: ["person", personId],
    queryFn: () => getBackendApi<PersonData>(`/osoby/${personId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie osoby</h2>
      <LoadingComponent queryResult={query}>
        <FormGenerator
          formDefiner={personForm({
            endpoint: `/osoby/${personId}`,
            method: "PUT",
            additionalSubmitFields: {
              osobaId: `${personId}`,
            },
            entityData: query.data,
          })}
        />
      </LoadingComponent>
    </>
  );
}
