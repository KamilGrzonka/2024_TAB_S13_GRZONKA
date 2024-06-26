import { Box, Container, Typography } from "@mui/material";
import BuildingsList from "../components/BuildingsList";

const Payments = () => {
  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "inline-block",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 4,
        }}
      >
        <Typography variant="h3">{`Płatności`}</Typography>
        <Typography variant="h5">{`Wybierz budynek, z którego płatności chcesz zobaczyć:`}</Typography>
      </Box>
      <BuildingsList />
    </Container>
  );
};

export default Payments;
