import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import { ApartmentData, PersonData, RegistrationData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { registrationForm } from "./registrationFormSchema";

export function RegistrationFormAdd() {
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
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie meldunku</h2>
      <LoadingComponent queryResult={[persons, apartments]}>
        <FormGenerator
          formDefiner={registrationForm({
            endpoint: `/meldunki`,
            method: "POST",
            entityData: {
              apartments: apartments.data!,
              persons: persons.data!,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}

export function RegistrationFormEdit() {
  const { buildingId, registrationId } = useParams();
  const query = useQuery({
    queryKey: ["registration", registrationId],
    queryFn: () =>
      getBackendApi<RegistrationData>(`/meldunki/${registrationId}`),
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
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie meldunku</h2>
      <LoadingComponent queryResult={[query, persons, apartments]}>
        <FormGenerator
          formDefiner={registrationForm({
            endpoint: `/meldunki/${registrationId}`,
            method: "PUT",
            entityData: {
              apartments: apartments.data!,
              persons: persons.data!,
              registration: query.data,
            },
            additionalSubmitFields: {
              meldunekId: registrationId,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}
