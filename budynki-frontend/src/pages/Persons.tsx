import { Box, Container, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import PersonsList from "../components/PersonsList";
import { Link } from "react-router-dom";

const Persons = () => {
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
        <Typography variant="h3">{`Osoby`}</Typography>
        <Button asChild className="bg-blue-500 pt-6 pb-6 pl-10 pr-10">
          <Link to="dodaj">Dodaj osobę</Link>
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
        <Typography variant="h5">{`Wybierz osobę, której szczegóły chcesz zobaczyć:`}</Typography>
      </Box>
      <PersonsList />
    </Container>
  );
};

export default Persons;
