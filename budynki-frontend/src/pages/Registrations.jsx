import { Box, Button, Container, Paper, Typography } from "@mui/material";
import BuildingLabel from '../components/BuildingLabel';

const Registrations = () => {
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
        <Typography variant="h3">{`Meldunki`}</Typography>
        <Typography variant="h5">{`Wybierz budynek, którego dotyczy meldunek:`}</Typography>
      </Box>
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
    </Container>
  );
};

export default Registrations;