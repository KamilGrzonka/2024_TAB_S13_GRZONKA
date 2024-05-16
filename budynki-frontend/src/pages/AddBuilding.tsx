import AddForm from "@/components/forms/AddForm";
import { buildingFormSchema } from "@/components/forms/building/buildingFormSchema";
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
        <AddForm URL={`/budynki`} FORM_SCHEMA={buildingFormSchema} />
      </Box>
    </Container>
  );
}
