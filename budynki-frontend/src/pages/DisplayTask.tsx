import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { Box, Container, Typography } from "@mui/material";
import { X } from "lucide-react";
import { TaskData, CompanyData } from "@/types/Entities";

export default function DisplayTask() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const task = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getBackendApi<TaskData>(`/zadania/${taskId}`),
  });

  const companyId = task.data?.firmaId;

  const company = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getBackendApi<CompanyData>(`/firmy/${companyId}`),
    enabled: !!companyId,
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      {task.isSuccess ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5
          }}
        >
          <Typography variant="h3">{`Zadanie ${task.data.id}`}</Typography>
          <X
            className="hover:cursor-pointer"
            onClick={() => navigate("..", { relative: "path" })}
            size={36}
          />
        </Box>
      ) : task.isLoading ? (
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
        {task.isSuccess ? (
          <Typography variant="h5">{`Zgłoszenie ${task.data.zgloszenieId}`}</Typography>
        ) : task.isLoading ? (
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
      {task.isSuccess ? (
        <div>
          <Typography variant="h6">
            Opis: {task.data.opis}
          </Typography>
          <Typography variant="h6">
            <Link to={`/firmy/${task.data.firmaId}`}>
              Firma podwykonawcza:{" "}
              {companyId
                ? company.isSuccess
                  ? <Box>
                      <Typography variant="h6">{`Nazwa firmy: ${company.data.nazwa}`} </Typography>
                      <Typography variant="h6">{`NIP: ${company.data.nip}`} </Typography>
                      <Typography variant="h6">{`Adres: ${company.data.ulica} ${company.data.numerBudynku}/${company.data.numerLokalu}, ${company.data.kodPocztowy} ${company.data.miasto}`} </Typography>
                    </Box> 
                  : `${companyId}`
                : ""}
            </Link>
          </Typography>
          <Typography variant="h6">
            Data rozpoczęcia: {task.data.dataRozpoczecia.toLocaleDateString()}{" "}
          </Typography>
          <Typography variant="h6">
            Data zakończenia:{" "}
            {task.data.dataZakonczenia?.toLocaleDateString() || ""}
          </Typography>
          <Typography variant="h6">
            Koszt: {task.data.koszt}
          </Typography>
          <div id="buttons" className="flex mt-20 justify-center">
            <Button asChild className="pt-6 pb-6 pl-10 pr-10">
              <Link to="edytuj">Edytuj zadanie</Link>
            </Button>
            {/* <Button variant="destructive">
            Usuń dane
          </Button> */}
          </div>
        </div>
      ) : task.isLoading ? (
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
