import { Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { ApartmentData } from "@/types/ApartmentData";

async function fetchApartment(id: number) {
  const apartment: ApartmentData = await fetch(
    `http://localhost:8080/api/mieszkania/${id}`,
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return apartment;
}

export default function DisplayApartment() {
  const { apartmentId } = useParams();
  const apartment = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => fetchApartment(Number(apartmentId)),
  });

  return (
    <>
      {apartment.isSuccess ? (
        <div className="mt-8 mx-auto max-w-md">
          <Typography variant="h3">{apartment.data.numerMieszkania}</Typography>
          <p>Piętro: {apartment.data.pietro}</p>
          <p>Liczba mieszkańców: {apartment.data.liczbaMieszkancow} </p>
          <p>Opis: {apartment.data.opis} </p>
          <div id="buttons" className="mt-4">
            <Button asChild className="bg-blue-500">
              <Link to="edytuj">Edytuj dane</Link>
            </Button>
            {/* <Button variant="destructive">
            Usuń dane
          </Button> */}
          </div>
        </div>
      ) : apartment.isLoading ? (
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
