import BuildingsList from "../components/BuildingsList";
import { Box, Container, Typography } from "@mui/material";

const Repairs = () => {
  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "inline-block",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 4,
        }}
      >
        <Typography variant="h3">{`Zgłoszenia`}</Typography>
        <Typography variant="h5">{`Wybierz budynek, którego dotyczy zgłoszenie:`}</Typography>
      </Box>
      <BuildingsList />
    </Container>
  );
};

export default Repairs;
