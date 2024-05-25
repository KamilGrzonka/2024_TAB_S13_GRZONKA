import { Box, Container, Typography } from "@mui/material";

const Companies = () => {
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
        <Typography variant="h3">{`Firmy`}</Typography>
      </Box>
    </Container>
  );
};

export default Companies;
