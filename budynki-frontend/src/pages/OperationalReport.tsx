import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, MoveDown, MoveUp } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { ChevronRight } from "lucide-react";
import { RepairDisplay } from "@/types/EntitiesDisplayHelpers";

interface OverduePayment {
  budynekId: number;
  wartosc: number;
  miesiaceOpoznienia: number;

  mieszkanieId?: number;
  meldunekId?: number;

  zgloszenieId?: number;
  zadanieId?: number;
}

export default function OperationalReport() {
  const activeRepairs = useQuery({
    queryKey: ["activeRepairs"],
    queryFn: () =>
      getBackendApi<RepairDisplay[]>(`/budynki/aktywneZgloszeniaWyswietl`),
  });
  const overduePayments = useQuery({
    queryKey: ["overduePayments"],
    queryFn: () => getBackendApi<OverduePayment[]>(`/budynki/zaleglePlatnosci`),
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
        <Typography variant="h3">Aktywne zgłoszenia</Typography>
      </Box>
      {activeRepairs.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 text-center">Zgłoszenie</TableHead>
              <TableHead className="w-1/6 text-center">Priorytet</TableHead>
              <TableHead className="w-1/6 text-center">
                Numer mieszkania
              </TableHead>
              <TableHead className="w-1/6 text-center">
                Typ zgłoszenia
              </TableHead>
              <TableHead className="w-1/6 text-center">
                Status zgłoszenia
              </TableHead>
              <TableHead className="w-1/6 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeRepairs.data.map((repair) => (
              <TableRow key={repair.zgloszenieid}>
                <TableCell className="font-medium text-center">
                  <div className="line-clamp-2">{`${repair.opis}`}</div>
                </TableCell>
                <TableCell className="text-center">
                  {`${repair.priorytet}`}
                </TableCell>
                <TableCell className="text-center">
                  <Link
                    to={`/budynki/${repair.budynekId}/${repair.mieszkanieId}`}
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
                  <Link
                    to={`/zgloszenia/${repair.budynekId}/${repair.zgloszenieid}`}
                  >
                    <ChevronRight className="mr-5" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : activeRepairs.isLoading ? (
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
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Typography variant="h3">Zaległe płatności</Typography>
      </Box>
      {overduePayments.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">Kwota </TableHead>
              <TableHead className="w-1/5 text-center">
                Miesiące opóźnienia
              </TableHead>
              <TableHead className="w-1/5 text-center">Typ</TableHead>
              <TableHead className="w-1/5 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overduePayments.data.map((payment, id) => (
              <TableRow key={id}>
                <TableCell className="text-center">{payment.wartosc}</TableCell>
                <TableCell className="text-center">
                  {payment.miesiaceOpoznienia}
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    {payment.meldunekId ? (
                      <MoveUp className="text-green-500" />
                    ) : (
                      <MoveDown className="text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    {payment.meldunekId ? (
                      <Link to={`/meldunki/${payment.budynekId}/${payment.meldunekId}`}>
                        <ChevronRight className="mr-5" />
                      </Link>
                    ) : (
                      <Link to={`/zgloszenia/${payment.budynekId}/${payment.zgloszenieId}/zadania/${payment.zadanieId}`}>
                        <ChevronRight className="mr-5" />
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : overduePayments.isLoading ? (
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
