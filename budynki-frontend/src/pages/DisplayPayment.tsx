import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { Box, Container, Typography } from "@mui/material";
import { X } from 'lucide-react';
import { PaymentData, BuildingData, TaskData } from "@/types/Entities";

export default function DisplayPayment() {
  const { paymentId, buildingId } = useParams();
  const navigate = useNavigate();

  const building = useQuery({
    queryKey: ["building", buildingId],
    queryFn: () => getBackendApi<BuildingData>(`/budynki/${buildingId}`),
  });

  const payment = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getBackendApi<PaymentData>(`/platnosci/${paymentId}`),
  });

  const taskId = payment.data?.zadanieId;

  const task = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getBackendApi<TaskData>(`/zadania/${taskId}`),
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
          <X className="hover:cursor-pointer" onClick={() => navigate("..", { relative: "path" })} size={36}/>
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
      {payment.isSuccess ? (
        <div>
          <Typography variant="h5">
            Płatność {payment.data.id}
          </Typography>
          <Typography variant="h6">Data zrealizowania: {payment.data.dataZrealizowania.toLocaleDateString()}</Typography>
          <Typography variant="h6">Kwota: {payment.data.wartosc} </Typography>
          {payment.data.meldunekId?(
          <Typography variant="h6">
            <Link to={`/meldunki/${buildingId}/${payment.data.meldunekId}`}>
              Meldunek: {payment.data.meldunekId}
            </Link>
          </Typography>
          ):
          (
          <Typography variant="h6">
            <Link to={`/zgloszenia/${buildingId}/${task.data?.zgloszenieId}/zadania/${payment.data.zadanieId}`}>
              Zadanie: {payment.data.zadanieId}
            </Link>
          </Typography>
          )}
          <div id="buttons" className="flex mt-20 justify-center">
            {payment.data.meldunekId?(
            <Button asChild className="pt-6 pb-6 pl-10 pr-10">
              <Link to="przychodzaceedytuj">Edytuj płatność</Link>
            </Button>
            ):
            (
            <Button asChild className="pt-6 pb-6 pl-10 pr-10">
              <Link to="wychodzaceedytuj">Edytuj płatność</Link>
            </Button>
            )}
            {/* <Button variant="destructive">
            Usuń dane
          </Button> */}
          </div>
        </div>
      ) : payment.isLoading ? (
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