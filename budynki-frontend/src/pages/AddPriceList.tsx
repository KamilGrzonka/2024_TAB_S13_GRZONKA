import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import FormGenerator from "@/components/forms/FormGenerator";
import {
  priceListFormFields,
  priceListFormSchema,
} from "@/components/forms/priceList/PriceListFormSchema";

export default function AddPriceList() {
  const { priceListId } = useParams();

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
            formSchema={priceListFormSchema}
            formFieldDefiner={priceListFormFields()}
            url={`/cenniki/`}
            method={`POST`}
            additionalSubmitFields={{
              cennikId: priceListId,
            }}
          />
      </Box>
    </Container>
  );
}
