import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { Box, Container, Typography } from "@mui/material";
import { X } from "lucide-react";
import { BuildingData } from "@/types/Entities";
import { RegistrationDisplay } from "@/types/EntitiesDisplayHelpers";

export default function DisplayRegistration() {
  const { registrationId } = useParams();
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const registration = useQuery({
    queryKey: ["registrations-display", registrationId],
    queryFn: () =>
      getBackendApi<RegistrationDisplay>(
        `/meldunki/${registrationId}/meldunkiWyswietl`,
      ),
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
          <X className="hover:cursor-pointer" onClick={() => navigate("..", { relative: "path" })} size={36} />
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
      {registration.isSuccess ? (
        <div>
          <Typography variant="h6">
          <Link
              to={`/osoby/${registration.data.osobaId}`}
            >
              Wynajmujący: {registration.data.imie} {registration.data.nazwisko}
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link
              to={`/budynki/${buildingId}/${registration.data.mieszkanieId}`}
            >
              Numer mieszkania: {registration.data.numerMieszkania}
            </Link>
          </Typography>
          <Typography variant="h6">
            Data początkowa: {registration.data.dataMeldunku.toLocaleDateString()}{" "}
          </Typography>
          <Typography variant="h6">
            Data końcowa:{" "}
            {registration.data.dataWymeldowania?.toLocaleDateString() || ""}
          </Typography>
          <div id="buttons" className="flex mt-20 justify-center">
            <Button asChild className="mr-40 pt-6 pb-6 pl-10 pr-10">
              <Link to="edytuj">Edytuj meldunek</Link>
            </Button>
            {/* <Button variant="destructive">
            Usuń dane
          </Button> */}
          </div>
        </div>
      ) : registration.isLoading ? (
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
