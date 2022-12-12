import * as React from "react";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import UpdateProfileForm from "./forms/updateProfileForm";

const UpdateProfile = () => {
  return (
    <Card>
      <CardHeader title="Update Profile" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UpdateProfileForm />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UpdateProfile;
