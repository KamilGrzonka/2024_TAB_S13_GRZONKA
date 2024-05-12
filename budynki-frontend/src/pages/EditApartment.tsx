import { Box, Container } from "@mui/material";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApartmentForm from "@/components/ApartmentForm";
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

export default function EditApartment() {
  const { apartmentId } = useParams();
  const apartment = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => fetchApartment(Number(apartmentId)),
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
        {apartment.isSuccess ? (
          <ApartmentForm {...apartment.data} />
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
      </Box>
    </Container>
  );
}
