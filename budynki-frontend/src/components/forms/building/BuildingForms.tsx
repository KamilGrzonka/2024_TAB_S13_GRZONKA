import { getBackendApi } from "@/components/fetchBackendApi";
import { BuildingData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { buildingForm } from "./buildingFormSchema";
import LoadingComponent from "@/components/LoadingComponent";

export function BuildingFormAdd() {
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie budynku</h2>
      <FormGenerator
        formDefiner={buildingForm({
          endpoint: `/budynki`,
          method: "POST",
        })}
      />
    </>
  );
}

export function BuildingFormEdit() {
  const { buildingId } = useParams();
  const query = useQuery({
    queryKey: ["building", buildingId],
    queryFn: () => getBackendApi<BuildingData>(`/budynki/${buildingId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie budynku</h2>
      <LoadingComponent queryResult={query}>
        <FormGenerator
          formDefiner={buildingForm({
            endpoint: `/budynki/${buildingId}`,
            method: "PUT",
            entityData: query.data,
            additionalSubmitFields: {
              budynekId: buildingId,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}
