import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import { PriceListData } from "@/types/Entities";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import { priceListForm } from "./PriceListFormSchema";

export function PriceListFormAdd() {
  const { apartmentId } = useParams();
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie Cennika</h2>
      <FormGenerator
        formDefiner={priceListForm({
          endpoint: `/cenniki`,
          method: "POST",
          additionalSubmitFields: {
            mieszkanieId: `${apartmentId}`,
          },
        })}
      />
    </>
  );
}

export function PriceListFormEdit() {
  const { apartmentId, priceListId } = useParams();
  const query = useQuery({
    queryKey: ["cennik", priceListId],
    queryFn: () => getBackendApi<PriceListData>(`/cenniki/${priceListId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie cennika</h2>
      <LoadingComponent queryResult={query}>
        <FormGenerator
          formDefiner={priceListForm({
            endpoint: `/cenniki/${priceListId}`,
            method: "PUT",
            additionalSubmitFields: {
              mieszkanieId: `${apartmentId}`,
              cennikId: `${priceListId}`,
            },
            entityData: query.data,
          })}
        />
      </LoadingComponent>
    </>
  );
}
