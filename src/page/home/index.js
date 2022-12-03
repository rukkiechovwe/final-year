import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import AppWidgetSummary from "../../components/common/appSummary";

const Home = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Students"
              total={200}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Counselors"
              total={100}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Upcoming Sessions"
              total={10}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Rejected Sessions"
              total={5}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ mb: 5 }}>
          Upcoming Sessions
        </Typography>
      </Container>
    </>
  );
};

export default Home;
