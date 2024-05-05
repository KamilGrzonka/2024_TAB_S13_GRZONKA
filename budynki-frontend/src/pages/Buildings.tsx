import { Box, Button, Container, Typography } from "@mui/material";
import BuildingLabel from "../components/BuildingLabel";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

interface BuildingData {
  numberBudynku: number;
  adres: string;
  liczbaMiejsc: number;
}

async function fetchBuildings() {
  const buildings: BuildingData[] = await fetch(
    "http://localhost:8080/api/budynki",
  ).then((response) => response.json());
  return buildings;
}

const Buildings = () => {
  const buildings = useQuery({
    queryKey: ["buildings"],
    queryFn: fetchBuildings,
  });

  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 30,
          marginTop: 5,
        }}
      >
        <Typography variant="h3">{`Budynki`}</Typography>
        <Button sx={{ padding: 2 }} color="primary" variant="contained">
          Dodaj budynek
        </Button>
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 30,
          marginBottom: 4,
        }}
      >
        <Typography variant="h5">{`Wybierz budynek, którego szczegóły chcesz zobaczyć:`}</Typography>
      </Box>
      {buildings.isSuccess ? (
        buildings.data.map((building) => (
          <BuildingLabel
            key={building.numberBudynku}
            name={building.adres.split(",")[0]}
            address={building.adres}
            id={building.numberBudynku}
          />
        ))
      ) : buildings.isPending ? (
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

export default Buildings;
