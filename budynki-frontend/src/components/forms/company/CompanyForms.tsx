import { useParams } from "react-router-dom";
import FormGenerator from "../FormGenerator";
import LoadingComponent from "@/components/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import { getBackendApi } from "@/components/fetchBackendApi";
import { companyForm } from "./companyFormSchema";
import { CompanyData } from "@/types/Entities";

export function CompanyFormAdd() {
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie firmy</h2>
      <FormGenerator
        formDefiner={companyForm({
          endpoint: `/firmy`,
          method: "POST",
        })}
      />
    </>
  );
}

export function CompanyFormEdit() {
  const { companyId } = useParams();
  const query = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getBackendApi<CompanyData>(`/firmy/${companyId}`),
  });
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Edytowanie firmy</h2>
      <LoadingComponent queryResult={query}>
        <FormGenerator
          formDefiner={companyForm({
            endpoint: `/firmy/${companyId}`,
            method: "PUT",
            additionalSubmitFields: {
              firmaId: `${companyId}`,
            },
            entityData: query.data,
          })}
        />
      </LoadingComponent>
    </>
  );
}
