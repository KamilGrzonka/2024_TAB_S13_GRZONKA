import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { PriceListData } from "@/types/PriceListData";
import { getBackendApi } from "@/components/fetchBackendApi";
import LoadingComponent from "@/components/LoadingComponent";
import FormGenerator from "@/components/forms/FormGenerator";
import {
  priceListFormFields,
  priceListFormSchema,
} from "@/components/forms/priceList/PriceListFormSchema";

export default function EditPriceList() {
  const { priceListId } = useParams();
  const query = useQuery({
    queryKey: ["cennik", priceListId],
    queryFn: () => getBackendApi<PriceListData>(`/cenniki/${priceListId}`),
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "fixed-inline",
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
        }}
      >
        <LoadingComponent queryResult={query}>
          <FormGenerator
            formSchema={priceListFormSchema}
            formFieldDefiner={priceListFormFields({ entityData: query.data })}
            url={`/cenniki/${priceListId}`}
            method={`PUT`}
            additionalSubmitFields={{
              cennikId: priceListId,
            }}
          />
        </LoadingComponent>
      </Box>
    </Container>
  );
}
