import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "@/components/fetchBackendApi";
import { Box, Container, Typography } from "@mui/material";
import { X } from 'lucide-react';
import { CompanyData } from "@/types/Entities";

export default function DisplayCompany() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const company = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getBackendApi<CompanyData>(`/firmy/${companyId}`),
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      {company.isSuccess ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 4,
          }}
        >
          <Typography variant="h3">{`Firma ${company.data.id}`}</Typography>
          <X className="hover:cursor-pointer" onClick={() => navigate("..", { relative: "path" })} size={36}/>
        </Box>
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

      {company.isSuccess ? (
        <div>
          <Typography variant="h5">Nazwa: {company.data.nazwa}</Typography>
          <Typography variant="h5">NIP: {company.data.nip} </Typography>
          <Typography variant="h5">Adres: {`${company.data.ulica} ${company.data.numerBudynku}/${company.data.numerLokalu}, ${company.data.kodPocztowy} ${company.data.miasto}`} </Typography>
          <div id="buttons" className="flex mt-20 justify-center">
            <Button asChild className="mr-40 pt-6 pb-6 pl-10 pr-10">
              <Link to="edytuj">Edytuj dane</Link>
            </Button>
            <Button asChild className="pt-6 pb-6 pl-10 pr-10">
              <Link to="zadania">Zadania</Link>
            </Button>
            {/* <Button variant="destructive">
            Usuń dane
          </Button> */}
          </div>
        </div>
      ) : company.isLoading ? (
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