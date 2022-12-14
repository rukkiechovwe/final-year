import { Typography } from "@mui/material";
import React from "react";
import SessionTable from "../../components/sessionTable";
import useAuth from "../../utils/hooks/useAuth";
import useSession from "../../utils/hooks/useSessions";

const StudentSessions = () => {
  const { userSessions } = useSession();
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Student Sessions
      </Typography>
      <SessionTable sessions={userSessions} userRole={user.role} />
    </>
  );
};

export default StudentSessions;
