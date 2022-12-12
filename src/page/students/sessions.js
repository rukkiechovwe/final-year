import { Typography } from "@mui/material";
import React from "react";
import SessionTable from "../../components/sessionTable";

const StudentSessions = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        StudentSessions
      </Typography>
      <SessionTable />
    </>
  );
};

export default StudentSessions;
