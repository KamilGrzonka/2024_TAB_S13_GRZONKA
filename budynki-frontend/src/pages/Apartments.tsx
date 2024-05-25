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
import { ChevronRight } from 'lucide-react';
import { ApartmentData, BuildingData } from "@/types/Entities";

const Apartments = () => {
  const { buildingId } = useParams();
  const apartments = useQuery({
    queryKey: ["building-apartments", buildingId],
    queryFn: () => getBackendApi<ApartmentData[]>(`/budynki/${buildingId}/mieszkania`),
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
          <Link to="dodaj">Dodaj mieszkanie</Link>
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
      {apartments.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 text-center">Numer mieszkania</TableHead>
              <TableHead className="w-1/6 text-center">Piętro</TableHead>
              <TableHead className="w-1/6 text-center">Liczba osób</TableHead>
              <TableHead className="w-2/6 text-center">Opis</TableHead>
              <TableHead className="w-1/6 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apartments.data.map((apartment) => (
              <TableRow key={apartment.id}>
                <TableCell className="font-medium text-center">{apartment.numerMieszkania}</TableCell>
                <TableCell className= "text-center">{apartment.pietro}</TableCell>
                <TableCell className="text-center">{apartment.liczbaMieszkancow}</TableCell>
                <TableCell className= "text-center">{apartment.opis}</TableCell>
                <TableCell className="justify-center flex">
                  <Link to={`${apartment.id}`}>
                    <ChevronRight className="mr-5"/>
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
