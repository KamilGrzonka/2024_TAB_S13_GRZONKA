import AddForm from "@/components/forms/AddForm";
import { personFormSchema } from "@/components/forms/person/personFormSchema";
import { Box, Container } from "@mui/material";

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
        <AddForm URL={`/osoby`} FORM_SCHEMA={personFormSchema} />
      </Box>
    </Container>
  );
}
