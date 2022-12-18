import { Typography } from "@mui/material";
import React from "react";
import StudentTable from "../../components/studentTable";
import useStudents from "../../utils/hooks/useStudents";

const AdminStudents = () => {
  const { students } = useStudents();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Students
      </Typography>
      <StudentTable students={students} />
    </>
  );
};

export default AdminStudents;
