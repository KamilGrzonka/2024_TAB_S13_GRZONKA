import BuildingsList from "@/components/BuildingsList";
import { Box, Container, Typography } from "@mui/material";

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
      <BuildingsList />
    </Container>
  );
};

export default Registrations;
