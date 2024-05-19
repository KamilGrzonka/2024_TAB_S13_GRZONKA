import FormGenerator from "@/components/forms/FormGenerator";
import { personForm } from "@/components/forms/person/personFormSchema";
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
        <FormGenerator
            formDefiner={personForm({
              endpoint: `/osoby`,
              method: "POST",
            })}
          />
      </Box>
    </Container>
  );
}
