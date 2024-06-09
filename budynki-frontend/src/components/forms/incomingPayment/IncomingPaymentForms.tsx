import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import { PaymentData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { incomingPaymentForm } from "./incomingPaymentFormSchema";
import { RegistrationDisplay } from "@/types/EntitiesDisplayHelpers";

export function IncomingPaymentFormAdd() {
  const { buildingId } = useParams();
  const registrations = useQuery({
    queryKey: ["registrations"],
    queryFn: () => getBackendApi<RegistrationDisplay[]>(`/budynki/${buildingId}/meldunkiWyswietl`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie płatności przychodzącej</h2>
      <LoadingComponent queryResult={registrations}>
        <FormGenerator
          formDefiner={incomingPaymentForm({
            endpoint: `/platnosci`,
            method: "POST",
            entityData: {
              registrations: registrations.data?.filter(registration => registration.wynajmujacy) || [],
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}

export function IncomingPaymentFormEdit() {
  const { buildingId, paymentId } = useParams();
  const registrations = useQuery({
    queryKey: ["registrations"],
    queryFn: () => getBackendApi<RegistrationDisplay[]>(`/budynki/${buildingId}/meldunkiWyswietl`),
  });
  const query = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getBackendApi<PaymentData>(`/platnosci/${paymentId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie płatności przychodzącej</h2>
      <LoadingComponent queryResult={[query, registrations]}>
        <FormGenerator
          formDefiner={incomingPaymentForm({
            endpoint: `/platnosci/${paymentId}`,
            method: "PUT",
            entityData: {
              registrations: registrations.data?.filter(registration => registration.wynajmujacy) || [],
              payment: query.data,
            },
            additionalSubmitFields: {
              platnoscId: `${paymentId}`,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}
