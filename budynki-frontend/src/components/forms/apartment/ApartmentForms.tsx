import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { apartmentForm } from "./apartmentFormSchema";
import LoadingComponent from "@/components/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import { getBackendApi } from "@/components/fetchBackendApi";
import { ApartmentData } from "@/types/Entities";

export function ApartmentFormAdd() {
  const { buildingId } = useParams();
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie mieszkania</h2>
      <FormGenerator
        formDefiner={apartmentForm({
          endpoint: `/mieszkania`,
          method: "POST",
          additionalSubmitFields: {
            budynekId: `${buildingId}`,
          },
        })}
      />
    </>
  );
}

export function ApartmentFormEdit() {
  const { buildingId, apartmentId } = useParams();
  const query = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => getBackendApi<ApartmentData>(`/mieszkania/${apartmentId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie mieszkania</h2>
      <LoadingComponent queryResult={query}>
        <FormGenerator
          formDefiner={apartmentForm({
            endpoint: `/mieszkania/${apartmentId}`,
            method: "PUT",
            additionalSubmitFields: {
              budynekId: `${buildingId}`,
              apartmentId: `${apartmentId}`,
            },
            entityData: query.data,
          })}
        />
      </LoadingComponent>
    </>
  );
}
