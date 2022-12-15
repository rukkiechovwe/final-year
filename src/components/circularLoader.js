import { Box, CircularProgress } from "@mui/material";

const CircularLoader = () => (
  <Box sx={{ width: "100%", m: "0 auto", p: "4rem 2rem" }}>
    <CircularProgress />
  </Box>
);

export default CircularLoader;
