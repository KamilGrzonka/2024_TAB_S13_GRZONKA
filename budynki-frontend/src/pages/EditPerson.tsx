import { Box, Container } from "@mui/material";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PersonEditForm from "@/components/PersonAddForm";
import { PersonData } from "@/types/PersonData";
import { postBackendApi } from "@/components/fetchBackendApi";

import { Typography } from "@mui/material";

export default function EditPerson() {
  const { personId } = useParams();
  const person = useQuery({
    queryKey: ["person", personId],
    queryFn: () => postBackendApi<PersonData>(personId),
  });

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
        <Typography variant="h3">{`Osoby`}</Typography>
        {person.isSuccess ? (
          <PersonEditForm {...person.data} />
        ) : person.isLoading ? (
          <div className="flex items-center justify-center">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-red-700">Error!</span>
          </div>
        )}
      </Box>
    </Container>
  );
}
