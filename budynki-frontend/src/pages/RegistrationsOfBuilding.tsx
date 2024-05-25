import { Box, Container, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { ChevronRight } from "lucide-react";
import { BuildingData } from "@/types/Entities";
import { RegistrationDisplay } from "@/types/EntitiesDisplayHelpers";

const Registrations = () => {
  const { buildingId } = useParams();
  const registrations = useQuery({
    queryKey: ["building-registrations-display", buildingId],
    queryFn: () =>
      getBackendApi<RegistrationDisplay[]>(
        `/budynki/${buildingId}/meldunkiWyswietl`,
      ),
  });
  const building = useQuery({
    queryKey: ["building", buildingId],
    queryFn: () => getBackendApi<BuildingData>(`/budynki/${buildingId}`),
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        {building.isSuccess ? (
          <Typography variant="h3">
            {`${building.data.numerBudynku} ${building.data.ulica}`}
          </Typography>
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
        <Button asChild className="pt-6 pb-6 pl-10 pr-10">
          <Link to="dodaj">Dodaj meldunek</Link>
        </Button>
      </Box>
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
      {registrations.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 text-center">Wynajmujący</TableHead>
              <TableHead className="w-1/6 text-center">
                Numer mieszkania
              </TableHead>
              <TableHead className="w-1/6 text-center">
                Data początkowa
              </TableHead>
              <TableHead className="w-2/6 text-center">Data końcowa</TableHead>
              <TableHead className="w-1/6 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.data.map((registration) => (
              <TableRow key={registration.meldunekId}>
                <TableCell className="font-medium text-center">
                  <Link
                    to={`/osoby/${registration.osobaId}`}
                  >{`${registration.imie} ${registration.nazwisko}`}</Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    to={`/budynki/${buildingId}/${registration.mieszkanieId}`}
                  >
                    {registration.numerMieszkania}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {registration.dataMeldunku.toDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {registration.dataWymeldowania?.toDateString() || ""}
                </TableCell>
                <TableCell className="justify-center flex">
                  <Link to={`${registration.meldunekId}`}>
                    <ChevronRight className="mr-5" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : registrations.isLoading ? (
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
};

export default Registrations;
