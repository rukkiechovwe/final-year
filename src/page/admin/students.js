import { Typography } from "@mui/material";
import React from "react";
import useAdmin from "../../utils/hooks/useUsers";

const AdminStudents = () => {
  const { students } = useAdmin();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Students
      </Typography>
    </>
  );
};

export default AdminStudents;
