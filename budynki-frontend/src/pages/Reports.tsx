import React from 'react';
import { Box, Container, Typography } from "@mui/material";

const Reports = () => {
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
        <Typography variant="h3">{`Raporty`}</Typography>
      </Box>
    </Container>
  );
};

export default Reports;
