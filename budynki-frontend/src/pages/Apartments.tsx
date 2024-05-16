import { Box, Button, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { BuildingData } from "@/types/BuildingData.ts";
import { ApartmentData } from "@/types/ApartmentData.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

async function fetchApartments(id: number) {
  const apartments: ApartmentData[] = await fetch(
    `http://localhost:8080/api/budynki/${id}/mieszkania`,
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return apartments;
}

async function fetchBuilding(id: number) {
  const building: BuildingData = await fetch(
    `http://localhost:8080/api/budynki/${id}`,
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return building;
}

const Apartments = () => {
  const { buildingId } = useParams();
  const apartments = useQuery({
    queryKey: ["building-apartments", buildingId],
    queryFn: () => fetchApartments(Number(buildingId)),
  });
  const building = useQuery({
    queryKey: ["building", buildingId],
    queryFn: () => fetchBuilding(Number(buildingId)),
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 10,
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
        <Button sx={{ padding: 2 }} color="primary" variant="contained">
          <Link to="dodaj">Dodaj mieszkanie</Link>
        </Button>
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
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
      {apartments.isSuccess ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Numer mieszkania</TableHead>
              <TableHead>Piętro</TableHead>
              <TableHead>Liczba osób</TableHead>
              <TableHead className="text-right">Opis</TableHead>
              <TableHead className="text-right">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apartments.data.map((apartment) => (
              <TableRow key={apartment.id}>
                <TableCell className="font-medium">
                  {apartment.numerMieszkania}
                </TableCell>
                <TableCell>{apartment.pietro}</TableCell>
                <TableCell>{apartment.liczbaMieszkancow}</TableCell>
                <TableCell className="text-right">{apartment.opis}</TableCell>
                <TableCell className="justify-end flex">
                  <Link to={`${apartment.numerMieszkania}`}>
                    <Button variant="contained" endIcon={<ArrowForwardIcon />}>
                      Szczegóły
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : apartments.isLoading ? (
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

export default Apartments;
