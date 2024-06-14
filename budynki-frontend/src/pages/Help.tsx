import { Box, Container, Typography } from "@mui/material";

const Help = () => {
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
        <Typography variant="h3">{`Pomoc`}</Typography>
      </Box>
    </Container>
  );
};

export default Help;
