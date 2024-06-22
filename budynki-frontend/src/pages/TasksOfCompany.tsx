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
import { CompanyData, RepairData, TaskData } from "@/types/Entities";

const TaskOfCompany = () => {
  const { companyId } = useParams();
  const tasks = useQuery({
    queryKey: ["tasks-company", companyId],
    queryFn: () => getBackendApi<TaskData[]>(`/firmy/${companyId}/zadania`),
  });
  const company = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getBackendApi<CompanyData>(`/firmy/${companyId}`),
  });
  const repairs = useQuery({
    queryKey: ["repairs"],
    queryFn: () => getBackendApi<RepairData[]>(`/zgloszenia`),
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
        {company.isSuccess ? (
          <Typography variant="h3">{`Firma: ${company.data.nazwa}`}</Typography>
        ) : company.isLoading ? (
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
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      ></Box>
      {tasks.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">Numer zadania</TableHead>
              <TableHead className="w-1/5 text-center">
                Data rozpoczęcia
              </TableHead>
              <TableHead className="w-1/5 text-center">
                Data zakończenia
              </TableHead>
              <TableHead className="w-1/5 text-center">Koszt</TableHead>
              <TableHead className="w-1/5 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.data.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium text-center">
                  {`${task.id}`}
                </TableCell>
                <TableCell className="text-center">
                  {`${task.dataRozpoczecia.toLocaleDateString()}`}
                </TableCell>
                <TableCell className="text-center">
                  {task.dataZakonczenia?.toLocaleDateString() || ""}
                </TableCell>
                <TableCell className="text-center">{task.koszt}</TableCell>
                <TableCell className="justify-center flex">
                  {repairs.isLoading ? (
                    <div className="flex items-center justify-center">
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </div>
                  ) : repairs.isSuccess ? (
                    <Link
                      to={`/zgloszenia/${repairs.data[task.zgloszenieId - 1].budynekId}/${task.zgloszenieId}/zadania/${task.id}`}
                    >
                      <ChevronRight className="mr-5" />
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="text-red-700">Error!</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : tasks.isLoading ? (
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

export default TaskOfCompany;
