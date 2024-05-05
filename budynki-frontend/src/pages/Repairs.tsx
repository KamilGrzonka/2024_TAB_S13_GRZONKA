import { Box, Container, Typography } from "@mui/material";
import BuildingLabel from "../components/BuildingLabel";

const Repairs = () => {
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
        <Typography variant="h3">{`Zgłoszenia`}</Typography>
        <Typography variant="h5">{`Wybierz budynek, którego dotyczy zgłoszenie:`}</Typography>
      </Box>
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
      <BuildingLabel name="Złota 44" address="Złota 44, 00-120 Warszawa" />
    </Container>
  );
};

export default Repairs;
