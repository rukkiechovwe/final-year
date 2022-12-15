import React from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import AppWidgetSummary from "../../components/common/appSummary";
import useSession from "../../utils/hooks/useSessions";
import SessionTable from "../../components/sessionTable";
import useAuth from "../../utils/hooks/useAuth";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

const StudentHome = () => {
  const { user } = useAuth();
  const { userSessions, upcomingUserSessions, completedUserSessions } =
    useSession();
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <AppWidgetSummary
              title="Total Sessions"
              total={userSessions?.length}
              color="primary"
              icon={<HistoryOutlinedIcon width={24} height={24} />}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <AppWidgetSummary
              title="Upcoming Sessions"
              total={upcomingUserSessions.length}
              color="warning"
              icon={<HistoryOutlinedIcon width={24} height={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AppWidgetSummary
              title="Completed Sessions"
              total={completedUserSessions.length}
              color="success"
              icon={<HistoryOutlinedIcon width={24} height={24} />}
            />
          </Grid>
        </Grid>

        <Box sx={{ my: 5 }}>
          <Typography variant="h4">Upcoming Sessions</Typography>
          <SessionTable
            sessions={userSessions.slice(0, 6)}
            userRole={user.role}
          />
        </Box>
      </Container>
    </>
  );
};

export default StudentHome;
