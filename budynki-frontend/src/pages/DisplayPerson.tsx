import { Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PersonData } from "@/types/PersonData";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

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

export default function DisplayPerson() {
  const { personId } = useParams();
  const person = useQuery({
    queryKey: ["person", personId],
    queryFn: () => fetchPerson(Number(personId)),
  });

  return (
    <>
      {person.isSuccess ? (
        <div className="mt-8 mx-auto max-w-md">
          <Typography variant="h3">{`${person.data.imie} ${person.data.nazwisko}`}</Typography>
          <p>PESEL: {person.data.pesel}</p>
          <div id="buttons" className="mt-4">
            <Button asChild className="bg-blue-500">
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
    </>
  );
}
