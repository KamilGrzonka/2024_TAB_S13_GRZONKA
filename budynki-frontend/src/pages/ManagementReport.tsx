import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
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
import { MoveUp, MoveDown } from "lucide-react";

interface BuildingProfit {
  budynekId: number;
  ulica: string;
  numerBudynku: string;
  kodPocztowy: string;
  miasto: string;
  wartosc: number;
}

export default function ManagementReport() {
  const [searchParams] = useSearchParams();

  const dataPoczatkowaParam = searchParams.get("dataPoczatkowa");
  const dataKoncowaParam = searchParams.get("dataKoncowa");

  //   const dataPoczatkowa: Date | undefined = dataPoczatkowaParam
  //     ? new Date(Number(dataPoczatkowaParam))
  //     : undefined;
  //   const dataKoncowa: Date | undefined = dataKoncowaParam
  //     ? new Date(Number(dataKoncowaParam))
  //     : undefined;

  const buildingsProfit = useQuery({
    queryKey: ["buildingsProfits"],
    queryFn: () =>
      getBackendApi<BuildingProfit[]>(
        `/budynki/zyski?dataPoczatkowa=${dataPoczatkowaParam}&dataKoncowa=${dataKoncowaParam}`,
      ),
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
        <Typography variant="h3">Zyski z budynków</Typography>
      </Box>
      {buildingsProfit.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">Budynek</TableHead>
              <TableHead className="w-1/5 text-center">Kwota </TableHead>
              <TableHead className="w-1/5 text-center">Typ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildingsProfit.data.map((buildingProfit) => (
              <TableRow key={buildingProfit.budynekId}>
                <TableCell className="font-medium text-center">
                  {`${buildingProfit.numerBudynku} ${buildingProfit.ulica} ${buildingProfit.miasto}`}
                </TableCell>
                <TableCell className="text-center">
                  {buildingProfit.wartosc}
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
                    {buildingProfit.wartosc > 0 ? (
                      <MoveUp className="text-green-500" />
                    ) : buildingProfit.wartosc < 0 ? (
                      <MoveDown className="text-red-500" />
                    ) : (
                      <>-</>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : buildingsProfit.isLoading ? (
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
