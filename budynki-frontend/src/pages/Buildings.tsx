import React from 'react';
import { Box, Button, Container, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import BuildingsList from "../components/BuildingsList";

const Buildings = () => {
  return (
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
        <Typography variant="h3">{`Budynki`}</Typography>
        <Button sx={{ padding: 2 }} color="primary" variant="contained">
          <Link to="nowy">Dodaj budynek</Link>
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
        <Typography variant="h5">{`Wybierz budynek, którego szczegóły chcesz zobaczyć:`}</Typography>
      </Box>
      <BuildingsList></BuildingsList>
    </Container>
  );
};

export default Buildings;
