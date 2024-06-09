import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import { PaymentData, TaskData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { outgoingPaymentForm } from "./outgoingPaymentFormSchema";

export function OutgoingPaymentFormAdd() {
  const { buildingId } = useParams();
  const tasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getBackendApi<TaskData[]>(`/budynki/${buildingId}/zadania`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie płatności wychodzącej</h2>
      <LoadingComponent queryResult={tasks}>
        <FormGenerator
          formDefiner={outgoingPaymentForm({
            endpoint: `/platnosci`,
            method: "POST",
            entityData: {
                tasks: tasks.data!,
            },
          })}
        />
      </LoadingComponent>
    </>
  );
}

export function OutgoingPaymentFormEdit() {
  const { buildingId, paymentId } = useParams();
  const tasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getBackendApi<TaskData[]>(`/budynki/${buildingId}/zadania`),
  });
  const query = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getBackendApi<PaymentData>(`/platnosci/${paymentId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie płatności wychodzącej</h2>
      <LoadingComponent queryResult={[query, tasks]}>
        <FormGenerator
          formDefiner={outgoingPaymentForm({
            endpoint: `/platnosci/${paymentId}`,
            method: "PUT",
            entityData: {
                tasks: tasks.data!,
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
