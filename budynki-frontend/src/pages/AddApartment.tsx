import AddForm from "@/components/forms/AddForm";
import { apartmentFormSchema } from "@/components/forms/apartment/apartmentFormSchema";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function AddApartment() {
  const { buildingId, apartmentId } = useParams();
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
        <AddForm
          URL={`/mieszkania`}
          FORM_SCHEMA={apartmentFormSchema}
          ADITIONAL_FORM_SUBMIT_VALUES={{
            id: apartmentId,
            budynekId: buildingId,
          }}
        />
      </Box>
    </Container>
  );
}
