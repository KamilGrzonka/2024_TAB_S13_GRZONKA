import { Box, Container, Typography } from "@mui/material";
import BuildingLabel from "../components/BuildingLabel";

const Persons = () => {
  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "inline-block",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 30,
          marginTop: 5,
          marginBottom: 4,
        }}
      >
        <Typography variant="h3">{`Osoby`}</Typography>
        <Typography variant="h5">{`Wybierz budynek, z którym związana jest osoba:`}</Typography>
      </Box>
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
    </Container>
  );
};

export default Persons;
