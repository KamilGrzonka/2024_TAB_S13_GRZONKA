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
import { RepairData, TaskData } from "@/types/Entities";

const TasksList = () => {
  const { repairId } = useParams();
  const tasks = useQuery({
    queryKey: ["tasks", repairId],
    queryFn: () =>
      getBackendApi<TaskData[]>(
        `/zgloszenia/${repairId}/zadania`,
      ),
  });
  const repair = useQuery({
    queryKey: ["repair", repairId],
    queryFn: () => getBackendApi<RepairData>(`/zgloszenia/${repairId}`),
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
        {repair.isSuccess ? (
          <Typography variant="h3">
            {`Zgłoszenie ${repair.data.id}`}
          </Typography>
        ) : repair.isLoading ? (
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
          <Link to="dodaj">Dodaj zadanie</Link>
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
      </Box>
      {tasks.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">Numer zadania</TableHead>
              <TableHead className="w-1/5 text-center">Data rozpoczęcia</TableHead>
              <TableHead className="w-1/5 text-center">Data zakończenia</TableHead>
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
                <TableCell className="text-center">
                  {task.koszt}
                </TableCell>
                <TableCell className="justify-center flex">
                  <Link to={`${task.id}`}>
                    <ChevronRight className="mr-5" />
                  </Link>
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

export default TasksList;