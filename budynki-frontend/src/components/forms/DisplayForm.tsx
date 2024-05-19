import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

export default function DisplayForm() {
  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
        sx={{
          display: "fixed-inline",
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
}
