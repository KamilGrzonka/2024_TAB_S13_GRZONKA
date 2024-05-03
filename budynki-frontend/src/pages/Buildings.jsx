import { Box, Button, Container, Paper, Typography } from "@mui/material";
import BuildingLabel from '../components/BuildingLabel';

const Buildings = () => {
  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          justifyContent: 'space-between',
          marginLeft: 30,
          marginTop: 5,
        }}
      >
        <Typography variant="h3">{`Budynki`}</Typography>
        <Button
          sx={{ padding: 2 }}
          color="primary"
          variant="contained"
        >
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
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
    </Container>
  );
};

export default Buildings;