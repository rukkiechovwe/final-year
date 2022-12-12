import { Typography } from "@mui/material";
import React from "react";
import SessionTable from "../../components/sessionTable";

const CounselorSessions = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Sessions
      </Typography>
      <SessionTable />
    </>
  );
};

export default CounselorSessions;
