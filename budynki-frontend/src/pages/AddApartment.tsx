import FormGenerator from "@/components/forms/FormGenerator";
import {
  apartmentFormFields,
  apartmentFormSchema,
} from "@/components/forms/apartment/apartmentFormSchema";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function AddApartment() {
  const { buildingId } = useParams();
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
        <FormGenerator
          formSchema={apartmentFormSchema}
          formFieldDefiner={apartmentFormFields()}
          url={`/mieszkania`}
          method={`POST`}
          additionalSubmitFields={{ budynekId: buildingId }}
        />
      </Box>
    </Container>
  );
}
