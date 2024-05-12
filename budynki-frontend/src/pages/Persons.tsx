import { Box, Button, Container, Typography } from "@mui/material";
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
          marginLeft: 10,
          marginTop: 5,
        }}
      >
        <Typography variant="h3">{`Osoby`}</Typography>
        <Button sx={{ padding: 2 }} color="primary" variant="contained">
          <Link to="dodaj">Dodaj osobę</Link>
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
        <Typography variant="h5">{`Wybierz osobę, której szczegóły chcesz zobaczyć:`}</Typography>
      </Box>
      <PersonsList />
    </Container>
  );
};

export default Persons;
