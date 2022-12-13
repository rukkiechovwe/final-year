import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import AppWidgetSummary from "../../components/common/appSummary";

const CounselorHome = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AppWidgetSummary
              title="Total Sessions"
              total={10}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppWidgetSummary
              title="Upcoming Sessions"
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

export default CounselorHome;
