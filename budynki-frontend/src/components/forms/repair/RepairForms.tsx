import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import { ApartmentData, PersonData, RepairData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { repairForm } from "./repairFormSchema";

export function RepairFormAdd() {
  const { buildingId } = useParams();
  const persons = useQuery({
    queryKey: ["persons"],
    queryFn: () => getBackendApi<PersonData[]>(`/osoby`),
  });
  const apartments = useQuery({
    queryKey: ["apartments", buildingId],
    queryFn: () =>
      getBackendApi<ApartmentData[]>(`budynki/${buildingId}/mieszkania`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie zgłoszenia</h2>
      <LoadingComponent queryResult={[persons, apartments]}>
        <FormGenerator
          formDefiner={repairForm({
            endpoint: `/zgloszenia`,
            method: "POST",
            entityData: {
              apartments: apartments.data!,
              persons: persons.data!,
            },
            additionalSubmitFields: {
                budynekId: `${buildingId}`,
            }
          })}
        />
      </LoadingComponent>
    </>
  );
}

export function RepairFormEdit() {
  const { buildingId, repairId } = useParams();
  const query = useQuery({
    queryKey: ["repair", repairId],
    queryFn: () =>
      getBackendApi<RepairData>(`/zgloszenia/${repairId}`),
  });
  const persons = useQuery({
    queryKey: ["persons"],
    queryFn: () => getBackendApi<PersonData[]>(`/osoby`),
  });
  const apartments = useQuery({
    queryKey: ["apartments", buildingId],
    queryFn: () =>
      getBackendApi<ApartmentData[]>(`budynki/${buildingId}/mieszkania`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie zgłoszenia</h2>
      <LoadingComponent queryResult={[query, persons, apartments]}>
        <FormGenerator
          formDefiner={repairForm({
            endpoint: `/zgloszenia/${repairId}`,
            method: "PUT",
            entityData: {
              apartments: apartments.data!,
              persons: persons.data!,
              repair: query.data,
            },
            additionalSubmitFields: {
                zgloszenieId: `${repairId}`,
                budynekId: `${buildingId}`,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}
