import { Box, Container, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { PersonData } from "@/types/PersonData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { getBackendApi } from "@/components/fetchBackendApi";
import { ChevronRight } from 'lucide-react';

async function fetchPersons() {
  const persons: PersonData[] = await fetch(
    "http://localhost:8080/api/osoby",
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return persons;
}



const Persons = () => {
  const persons = useQuery({
    queryKey: ["persons"],
    queryFn: fetchPersons,
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
        Osoby
      </Typography>
      <Button asChild className="bg-blue-500 pt-6 pb-6 pl-10 pr-10">
        <Link to="dodaj">Dodaj osobę</Link>
      </Button>
      </Box>
      {persons.isSuccess ? (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 text-center">Identyfikator</TableHead>
              <TableHead className="w-1/5 text-center">Imię</TableHead>
              <TableHead className="w-1/5 text-center">Nazwisko</TableHead>
              <TableHead className="w-1/5 text-center">PESEL</TableHead>
              <TableHead className="w-1/5 text-center">Edytuj</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {persons.data.map((apartment) => (
              <TableRow>
                <TableCell className="font-medium text-center">{apartment.id}</TableCell>
                <TableCell className="text-center">{apartment.imie}</TableCell>
                <TableCell className="text-center">{apartment.nazwisko}</TableCell>
                <TableCell className="text-center">{apartment.pesel}</TableCell>
                <TableCell className="justify-center flex">
                  <Link to={`${apartment.id}/edytuj`}>
                    <ChevronRight className="mr-5"/>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : persons.isLoading ? (
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

export default Persons;
