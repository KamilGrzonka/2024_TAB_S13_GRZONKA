import LoadingComponent from "@/components/LoadingComponent";
import { getBackendApi } from "@/components/fetchBackendApi";
import FormGenerator from "@/components/forms/FormGenerator";
import { personForm } from "@/components/forms/person/personFormSchema";
import { PersonData } from "@/types/Entities";
import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditPerson() {
  const { personId } = useParams();
  const query = useQuery({
    queryKey: ["person", personId],
    queryFn: () => getBackendApi<PersonData>(`/osoby/${personId}`),
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
            formDefiner={personForm({
              endpoint: `/osoby/${personId}`,
              method: "PUT",
              additionalSubmitFields: {
                osobaId: `${personId}`,
              },
              entityData: query.data,
            })}
          />
        </LoadingComponent>
      </Box>
    </Container>
  );
}
