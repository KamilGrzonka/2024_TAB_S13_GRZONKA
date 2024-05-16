import EditForm from "@/components/forms/EditForm";
import { apartmentFormSchema } from "@/components/forms/apartment/apartmentFormSchema";
import { ApartmentData } from "@/types/ApartmentData";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function EditApartment() {
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
        <EditForm<ApartmentData>
          URL={`/mieszkania/${apartmentId}`}
          FORM_SCHEMA={apartmentFormSchema}
          ADITIONAL_FORM_SUBMIT_VALUES={{ id: apartmentId, budynekId: buildingId }}
          QUERY_KEYS={["apartment", `${buildingId}`, `${apartmentId}`]}
        />
      </Box>
    </Container>
  );
}
