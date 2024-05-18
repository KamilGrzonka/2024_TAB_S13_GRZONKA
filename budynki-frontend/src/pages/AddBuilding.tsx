import FormGenerator from "@/components/forms/FormGenerator";
import { buildingFormFields, buildingFormSchema } from "@/components/forms/building/buildingFormSchema";
import { Box, Container } from "@mui/material";

export default function AddBuilding() {
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
            formSchema={buildingFormSchema}
            formFieldDefiner={buildingFormFields()}
            url={`/budynki`}
            method={`POST`}
            additionalSubmitFields={{}}
          />
      </Box>
    </Container>
  );
}
