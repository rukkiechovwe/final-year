import { Typography } from "@mui/material";
import React from "react";
import UpdateProfile from "./updateProfile";

const CounselorProfile = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Profile
      </Typography>
      <UpdateProfile />
    </>
  );
};

export default CounselorProfile;
