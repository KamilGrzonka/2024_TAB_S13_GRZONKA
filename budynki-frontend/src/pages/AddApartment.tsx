import { Box, Container } from "@mui/material";
import ApartmentAddForm from "@/components/ApartmentAddForm";

export default function AddApartment() {
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
        <ApartmentAddForm />
      </Box>
    </Container>
  );
}
