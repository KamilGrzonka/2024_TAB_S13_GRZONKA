import { Box, Container, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";

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
          marginTop: 5,
        }}
      >
        <Typography variant="h3">{`Budynki`}</Typography>
        <Button asChild className="pt-6 pb-6 pl-10 pr-10">
          <Link to="dodaj">Dodaj budynek</Link>
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
        <Typography variant="h5">{`Wybierz budynek, którego szczegóły chcesz zobaczyć:`}</Typography>
      </Box>
      <BuildingsList></BuildingsList>
    </Container>
  );
};

export default Buildings;
