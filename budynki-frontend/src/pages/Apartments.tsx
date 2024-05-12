import React from 'react';
import { Box, Button, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BuildingData } from "@/types/BuildingData.ts";
import { ApartmentData } from "@/types/ApartmentData.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from "@/components/ui/table";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

async function fetchApartments() {
  const apartments: ApartmentData[] = await fetch(
    "http://localhost:8080/api/mieszkania",
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return apartments;
}


const Apartments = () => {
    const apartments = useQuery({
        queryKey: ["apartments"],
        queryFn: fetchApartments,
    });

    const [building, setUser] = useState<BuildingData | null>(null);
    const navigate = useNavigate();
    const location  = useLocation();

    useEffect(() => {
        async function fetchUser() {
            const b: BuildingData = await (await fetch(
                `http://localhost:8080/api/budynki/${window.location.href.split('/budynki/')[1]}`,
            )).json();

            setUser(b);
        }

        fetchUser();
    }, []);

  return apartments.isSuccess ? (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 10,
          marginTop: 5,
        }}
      >
        <Typography variant="h3">{building.adres.split(",")[0]}</Typography>
        <Button sx={{ padding: 2 }} color="primary" variant="contained">
          <Link to="dodaj">Dodaj mieszkanie</Link>
        </Button>
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
          marginBottom: 4,
        }}
      >
        <Typography variant="h5">{building?.adres}</Typography>
      </Box>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Numer mieszkania</TableHead>
            <TableHead>Piętro</TableHead>
            <TableHead>Liczba osób</TableHead>
            <TableHead className="text-right">Opis</TableHead>
            <TableHead className="text-right">Szczegóły</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {apartments.data.map((apartment) => (
            <TableRow key={apartment.id}>
                <TableCell className="font-medium">{apartment.numerMieszkania}</TableCell>
                <TableCell>{apartment.pietro}</TableCell>
                <TableCell>{apartment.liczbaOsob}</TableCell>
                <TableCell className="text-right">{apartment.opis}</TableCell>
                <TableCell>
                    //ToDo button xD
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>

    </Container>
  )
  : (
    <div className="flex items-center justify-center">
      <span className="text-red-700">Error!</span>
    </div>
  );
};

export default Apartments;
