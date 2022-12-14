import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import AppWidgetSummary from "../../components/common/appSummary";
import useUsers from "../../utils/hooks/useUsers"

const AdminHome = () => {
  const {counselors,students} = useUsers()
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} >
            <AppWidgetSummary
              title="Students"
              total={students.length}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} >
            <AppWidgetSummary
              title="Counselors"
              total={counselors.length}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

        </Grid>

        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Upcoming Sessions
        </Typography> */}
      </Container>
    </>
  );
};

export default AdminHome;
