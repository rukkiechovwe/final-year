import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import CounselorSummary from "../../components/common/counselorSummary";
import useAdmin from "../../utils/hooks/useUsers";

const AdminCounselors = () => {
  const navigate = useNavigate();
  const { counselors } = useAdmin();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Counselors
      </Typography>

      <Grid container spacing={3}>
        {counselors.map((counselor) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={counselor.id}
            onClick={() => navigate(`/counselor-detail/${counselor.id}`)}
          >
            <CounselorSummary
              name={counselor.name}
              gender={counselor.gender}
              image={counselor.file}
            />
          </Grid>
        ))}
        {/* <Grid item xs={12} sm={6} md={4}>
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
        </Grid> */}
      </Grid>
    </>
  );
};

export default AdminCounselors;
