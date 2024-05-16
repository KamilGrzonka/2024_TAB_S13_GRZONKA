import { Box, Container } from "@mui/material";
import ApartmentEditForm from "@/components/forms/apartment/ApartmentEditForm";

export default function EditApartment() {
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
        <ApartmentEditForm />
      </Box>
    </Container>
  );
}
