import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AppWidgetSummary from "../../components/common/appSummary";
import useStudents from "../../utils/hooks/useStudents";
import useCounselors from "../../utils/hooks/useCounselors";

const AdminHome = () => {
  const { students } = useStudents();
  const { counselors } = useCounselors();

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AppWidgetSummary
              title="Students"
              total={students.length}
              icon={<GroupOutlinedIcon />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppWidgetSummary
              title="Counselors"
              total={counselors.length}
              color="info"
              icon={<GroupOutlinedIcon />}
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
