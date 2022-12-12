import { Typography } from "@mui/material";
import React from "react";
import SessionTable from "../../components/sessionTable";

const AdminSessions = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        AdminSessions
      </Typography>
      <SessionTable />
    </>
  );
};

export default AdminSessions;
