import { Box, Container, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
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
import { LoaderCircle } from "lucide-react";
import { ChevronRight } from 'lucide-react';
import { getBackendApi } from "@/components/fetchBackendApi";
import { CompanyData } from "@/types/Entities";

const Companies = () => {
  const companies = useQuery({
    queryKey: ["companies"],
    queryFn: () => getBackendApi<CompanyData[]>(`/firmy`),
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 4,
        }}
      >
      <Typography variant="h3">
        Firmy
      </Typography>
      <Button asChild className="pt-6 pb-6 pl-10 pr-10">
        <Link to="dodaj">Dodaj firmę</Link>
      </Button>
      </Box>
      {companies.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">Identyfikator</TableHead>
              <TableHead className="w-1/5 text-center">Nazwa</TableHead>
              <TableHead className="w-1/5 text-center">NIP</TableHead>
              <TableHead className="w-1/5 text-center">Miasto</TableHead>
              <TableHead className="w-1/5 text-center">Szczegóły</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.data.map((company) => (
              <TableRow>
                <TableCell className="font-medium text-center">{company.id}</TableCell>
                <TableCell className="text-center">{company.nazwa}</TableCell>
                <TableCell className="text-center">{company.nip}</TableCell>
                <TableCell className="text-center">{company.miasto}</TableCell>
                <TableCell className="justify-center flex">
                  <Link to={`${company.id}`}>
                    <ChevronRight className="mr-5"/>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : companies.isLoading ? (
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

export default Companies;
