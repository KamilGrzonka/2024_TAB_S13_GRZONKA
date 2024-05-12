import { Box, Container } from "@mui/material";
import PersonForm from "@/components/PersonForm";

export default function AddPerson() {
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
        <PersonForm />
      </Box>
    </Container>
  );
}
