import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import FormGenerator from "@/components/forms/FormGenerator";
import { priceListForm } from "@/components/forms/priceList/PriceListFormSchema";

export default function AddPriceList() {
  const { apartmentId } = useParams();

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
          formDefiner={priceListForm({
            endpoint: `/cenniki`,
            method: "POST",
            additionalSubmitFields: {
              mieszkanieId: `${apartmentId}`,
            },
          })}
        />
      </Box>
    </Container>
  );
}
