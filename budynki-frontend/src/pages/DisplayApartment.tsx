
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { Box, Container, Typography } from "@mui/material";
import { X } from 'lucide-react';
import { ApartmentData, BuildingData } from "@/types/Entities";

export default function DisplayApartment() {
  const { apartmentId } = useParams();
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const apartment = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => getBackendApi<ApartmentData>(`/mieszkania/${apartmentId}`),
  });
  const building = useQuery({
    queryKey: ["building", buildingId],
    queryFn: () => getBackendApi<BuildingData>(`/budynki/${buildingId}`),
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      {building.isSuccess ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Typography variant="h3">{`${building.data.numerBudynku} ${building.data.ulica}`}</Typography>
          <X onClick={() => navigate(-1)} size={36}/>
        </Box>
      ) : building.isLoading ? (
        <div className="flex items-center justify-center">
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-red-700">Error!</span>
        </div>
      )}
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        {building.isSuccess ? (
          <Typography variant="h5">{`${building.data.numerBudynku} ${building.data.ulica}, ${building.data.kodPocztowy} ${building.data.miasto}`}</Typography>
        ) : building.isLoading ? (
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
      {apartment.isSuccess ? (
        <div>
          <Typography variant="h5">
            Mieszkanie {apartment.data.numerMieszkania}
          </Typography>
          <Typography variant="h6">Piętro: {apartment.data.pietro}</Typography>
          <Typography variant="h6">Liczba mieszkańców: {apartment.data.liczbaMieszkancow} </Typography>
          <Typography variant="h6">Opis: {apartment.data.opis} </Typography>
          <div id="buttons" className="flex mt-20 justify-center">
            <Button asChild className="bg-blue-500 mr-40 pt-6 pb-6 pl-10 pr-10">
              <Link to="edytuj">Edytuj dane</Link>
            </Button>
            <Button asChild className="bg-blue-500 pt-6 pb-6 pl-10 pr-10">
              <Link to="cennik">Historia cen</Link>
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
        )
      }
    </Container>
  );
}
