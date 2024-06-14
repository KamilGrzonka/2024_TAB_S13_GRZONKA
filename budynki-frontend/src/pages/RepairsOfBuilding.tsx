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
import { RepairDisplay } from "@/types/EntitiesDisplayHelpers";

const BuildingRepairs = () => {
  const { buildingId } = useParams();
  const repairs = useQuery({
    queryKey: ["building-repairs", buildingId],
    queryFn: () =>
      getBackendApi<RepairDisplay[]>(
        `/budynki/${buildingId}/zgloszeniaWyswietl`,
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
        <Button asChild className="bg-blue-500 pt-6 pb-6 pl-10 pr-10">
          <Link to="dodaj">Dodaj zgłoszenie</Link>
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
      {repairs.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 text-center">Zgłoszenie</TableHead>
              <TableHead className="w-1/6 text-center">Priorytet</TableHead>
              <TableHead className="w-1/6 text-center">Numer mieszkania</TableHead>
              <TableHead className="w-1/6 text-center">Typ zgłoszenia</TableHead>
              <TableHead className="w-1/6 text-center">Status zgłoszenia</TableHead>
              <TableHead className="w-1/6 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairs.data.map((repair) => (
              <TableRow key={repair.zgloszenieid}>
                <TableCell className="font-medium text-center">
                    <div className="line-clamp-2">{`${repair.opis}`}</div>
                </TableCell>
                <TableCell className="text-center">
                    {`${repair.priorytet}`}
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    to={`/budynki/${buildingId}/${repair.mieszkanieId}`}
                  >
                    {repair.mieszkanieId}  
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {repair.typZgloszenia}
                </TableCell>
                <TableCell className="text-center">
                  {repair.statusZgloszenia}
                </TableCell>
                <TableCell className="justify-center flex">
                  <Link to={`${repair.zgloszenieid}`}>
                    <ChevronRight className="mr-5" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : repairs.isLoading ? (
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

export default BuildingRepairs;
