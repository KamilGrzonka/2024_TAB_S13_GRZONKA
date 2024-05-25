import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { Box, Container, Typography } from "@mui/material";
import { X } from "lucide-react";
import { BuildingData, RepairData } from "@/types/Entities";

export default function DisplayRepair() {
  const navigate = useNavigate();
  const { buildingId, repairId } = useParams();
  const repair = useQuery({
    queryKey: ["repair", repairId],
    queryFn: () =>
      getBackendApi<RepairData>(`/zgloszenia/${repairId}`),
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
      {repair.isSuccess ? (
        <div>
          <Typography variant="h6">
            Numer zgłoszenia: {repair.data.id}
          </Typography>
          <Typography variant="h6">
            <Link to={`/osoby/${repair.data.osobaId}`}>
              Osoba zgłaszająca: {repair.data.imie} {repair.data.nazwisko}
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link to={`/budynki/${buildingId}/${repair.data.mieszkanieId}`}>
              Numer mieszkania: {repair.data.mieszkanieId}
            </Link>
          </Typography>
          <Typography variant="h6">
            Priorytet: {repair.data.priorytet}
          </Typography>
          <Typography variant="h6">
            Typ zgłoszenia: {repair.data.typZgloszenia}
          </Typography>
          <Typography variant="h6">
            Status Zgłoszenia: {repair.data.statusZgloszenia}
          </Typography>
          <Typography variant="h6">
            Data zgłoszenia: {repair.data.dataZgloszenia.toLocaleDateString()}{" "}
          </Typography>
          <Typography variant="h6">
            Data końcowa:{" "}
            {repair.data.dataWykonania?.toLocaleDateString() || ""}
          </Typography>
          <Typography variant="h6">
            Koszt całkowity: {repair.data.kosztCalkowity}
          </Typography>
          <div id="buttons" className="flex mt-20 justify-center">
            <Button asChild className="mr-40 pt-6 pb-6 pl-10 pr-10">
              <Link to="edytuj">Edytuj zgłoszenie</Link>
            </Button>
            <Button asChild className="pt-6 pb-6 pl-10 pr-10">
              <Link to="zadania">Zadania</Link>
            </Button>
            {/* <Button variant="destructive">
            Usuń dane
          </Button> */}
          </div>
        </div>
      ) : repair.isLoading ? (
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
