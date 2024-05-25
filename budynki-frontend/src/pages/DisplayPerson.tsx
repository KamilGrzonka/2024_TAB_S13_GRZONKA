import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { Box, Container, Typography } from "@mui/material";
import { X } from "lucide-react";
import { PersonData } from "@/types/Entities";

export default function DisplayPerson() {
  const { personId } = useParams();
  const navigate = useNavigate();
  const person = useQuery({
    queryKey: ["person", personId],
    queryFn: () => getBackendApi<PersonData>(`/osoby/${personId}`),
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      {person.isSuccess ? (
        <div className="mt-8 mx-auto max-w-md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Typography variant="h3">{`${person.data.imie} ${person.data.nazwisko}`}</Typography>
            <X className="hover:cursor-pointer" onClick={() => navigate(-1)} size={36} />
          </Box>
          <p>PESEL: {person.data.pesel}</p>
          <div id="buttons" className="mt-4">
            <Button asChild>
              <Link to="edytuj">Edytuj dane</Link>
            </Button>
            {/* <Button variant="destructive">
            Usuń dane
          </Button> */}
          </div>
        </div>
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
    </Container>
  );
}
