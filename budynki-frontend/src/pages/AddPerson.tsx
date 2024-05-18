import FormGenerator from "@/components/forms/FormGenerator";
import { personFormFields, personFormSchema } from "@/components/forms/person/personFormSchema";
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
            formSchema={personFormSchema}
            formFieldDefiner={personFormFields()}
            url={`/osoby`}
            method={`POST`}
            additionalSubmitFields={{}}
          />
      </Box>
    </Container>
  );
}
