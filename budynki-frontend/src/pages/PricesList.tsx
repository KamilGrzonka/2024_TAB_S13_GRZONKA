import { Box, Container, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, ChevronRight, X } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { ApartmentData, BuildingData, PriceListData } from "@/types/Entities";

const PricesList = () => {
  const { buildingId, apartmentId } = useParams();
  const building = useQuery({
    queryKey: ["building", buildingId],
    queryFn: () => getBackendApi<BuildingData>(`/budynki/${buildingId}`),
  });
  const apartment = useQuery({
    queryKey: ["apartment", apartmentId],
    queryFn: () => getBackendApi<ApartmentData>(`/mieszkania/${apartmentId}`),
  });
  const priceList = useQuery({
    queryKey: ["prices", apartmentId],
    queryFn: () => getBackendApi<PriceListData[]>(`/mieszkania/${apartmentId}/cenniki`),
  });

  const navigate = useNavigate();

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
        <Typography variant="h3">Cennik</Typography>
        <X onClick={() => navigate(-1)} size={36} />
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        {building.isSuccess && apartment.isSuccess ? (
          <Typography variant="h5">{`Mieszkanie ${apartment.data.numerMieszkania}, ${building.data.numerBudynku} ${building.data.ulica}, ${building.data.kodPocztowy} ${building.data.miasto}`}</Typography>
        ) : building.isError || apartment.isError ? (
          <div className="flex items-center justify-center">
            <span className="text-red-700">Error!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        )}
      </Box>
      {priceList.isSuccess ? (
        <Box>
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 text-center">Cena</TableHead>
                <TableHead className="w-1/4 text-center">
                  Data Początkowa
                </TableHead>
                <TableHead className="w-1/4 text-center">
                  Data Końcowa
                </TableHead>
                <TableHead className="w-1/4 text-center">Edytuj</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceList.data.map((price) => (
                <TableRow key={price.id}>
                  <TableCell className="font-medium text-center">
                    {price.cena}
                  </TableCell>
                  <TableCell className="text-center">
                    {price.dataPoczatkowa.toDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {price.dataKoncowa.toDateString()}
                  </TableCell>
                  <TableCell className="justify-center flex">
                    <Link to={`${price.id}`}>
                      <ChevronRight className="mr-5" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-20">
            <Button asChild className="bg-blue-500 pt-6 pb-6 pl-10 pr-10">
              <Link to="dodaj">Dodaj cenę</Link>
            </Button>
          </div>
        </Box>
      ) : priceList.isLoading ? (
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

export default PricesList;
