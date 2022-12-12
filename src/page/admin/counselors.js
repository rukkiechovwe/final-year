import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import CounselorSummary from "../../components/common/counselorSummary";

const AdminCounselors = () => {
  const [counselors, setCounselors] = useState([]);
  useEffect(() => {
    // fetch counselors
    
  }, []);
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Counselors
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <CounselorSummary
            name="Ruth Annie"
            gender="Female"
            image={require("../../assets/images/author.jpg")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CounselorSummary
            name="Ruth Annie"
            gender="Female"
            image={require("../../assets/images/author.jpg")}
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <CounselorSummary
            name="Ruth Annie"
            gender="Female"
            image={require("../../assets/images/author.jpg")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminCounselors;
