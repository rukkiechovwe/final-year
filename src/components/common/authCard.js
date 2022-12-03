import { Box } from "@mui/material";

const AuthCard = ({ children }) => {
  return <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>;
};

export default AuthCard;
