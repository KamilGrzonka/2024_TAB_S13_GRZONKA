import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { getBackendApi } from "@/components/fetchBackendApi";
import LoadingComponent from "@/components/LoadingComponent";
import FormGenerator from "@/components/forms/FormGenerator";
import { priceListForm } from "@/components/forms/priceList/PriceListFormSchema";
import { PriceListData } from "@/types/Entities";

export default function EditPriceList() {
  const { apartmentId, priceListId } = useParams();
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
      </Box>
    </Container>
  );
}
