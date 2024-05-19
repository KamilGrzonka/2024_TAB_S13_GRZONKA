import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import FormGenerator from "@/components/forms/FormGenerator";
import { apartmentForm } from "@/components/forms/apartment/apartmentFormSchema";
import { ApartmentData } from "@/types/Entities";
import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditApartment() {
  const { buildingId, apartmentId } = useParams();
  const query = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => getBackendApi<ApartmentData>(`/mieszkania/${apartmentId}`),
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
      </Box>
    </Container>
  );
}
