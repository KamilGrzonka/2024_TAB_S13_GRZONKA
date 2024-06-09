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
import { ChevronRight, MoveUp, MoveDown } from "lucide-react";
import { BuildingData,PaymentData } from "@/types/Entities";

const BuildingPayments = () => {
  const { buildingId } = useParams();
  const payments = useQuery({
    queryKey: ["payments", buildingId],
    queryFn: () =>
      getBackendApi<PaymentData[]>(
        `/budynki/${buildingId}/platnosci`,
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
        <Box
        sx={{
          display: "flex",
          gap: 2,  // Odstęp między przyciskami
        }}
        >
        <Button asChild className="bg-blue-500 pt-6 pb-6 pl-10 pr-10">
          <Link to="przychodzacedodaj">Dodaj płatność przychodącą</Link>
        </Button>
        <Button asChild className="bg-blue-500 pt-6 pb-6 pl-10 pr-10">
          <Link to="wychodzacedodaj">Dodaj płatność wychodzącą</Link>
        </Button>
        </Box>
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
      {payments.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">Identyfikator</TableHead>
              <TableHead className="w-1/5 text-center">Data zrealizowania</TableHead>
              <TableHead className="w-1/5 text-center">Kwota </TableHead>
              <TableHead className="w-1/5 text-center">Typ</TableHead>
              <TableHead className="w-1/5 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.data.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium text-center">
                    {`${payment.id}`}
                </TableCell>
                <TableCell className="text-center">
                    {`${payment.dataZrealizowania.toLocaleDateString()}`}
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    to={`/budynki/${buildingId}/${payment.mieszkanieId}`}
                  >
                    {payment.wartosc}  
                  </Link>
                </TableCell>
                <TableCell>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {payment.meldunekId ? <MoveUp className="text-green-500" /> : <MoveDown className="text-red-500" />}
                </div>
                </TableCell>
                <TableCell>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Link to={`${payment.id}`}>
                    <ChevronRight className="mr-5" />
                    </Link>
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : payments.isLoading ? (
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

export default BuildingPayments;
