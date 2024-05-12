import { Box, Container } from "@mui/material";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PersonForm from "@/components/PersonForm";
import { PersonData } from "@/types/PersonData";

async function fetchPerson(id: number) {
  const person: PersonData = await fetch(
    "http://localhost:8080/api/osoby/" + id,
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return person;
}

export default function EditPerson() {
  const { id } = useParams();
  const person = useQuery({
    queryKey: ["person", id],
    queryFn: () => fetchPerson(Number(id)),
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
        {person.isSuccess ? (
          <PersonForm {...person.data} />
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
