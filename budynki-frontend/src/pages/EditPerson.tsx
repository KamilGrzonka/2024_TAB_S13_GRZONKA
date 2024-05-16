import EditForm from "@/components/forms/EditForm";
import { personFormSchema } from "@/components/forms/person/personFormSchema";
import { PersonData } from "@/types/PersonData";
import { Box, Container } from "@mui/material";

import { useParams } from "react-router-dom";

export default function EditPerson() {
  const { personId } = useParams();
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
        <EditForm<PersonData>
          URL={`/osoby/${personId}`}
          FORM_SCHEMA={personFormSchema}
          ADITIONAL_FORM_SUBMIT_VALUES={{ id: personId }}
          QUERY_KEYS={["person", `${personId}`]}
        />
      </Box>
    </Container>
  );
}
