import { Avatar, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import Detail from "../../components/details";

export default function Details() {
  return (
    <div>
      <Detail
        prevTitle="Counselor"
        prev="/counselor"
        activeTitle="Details"
        active="/details"
      >
        <Grid item xs={12}>
          <Avatar src="" sx={{ width: 80, height: 80 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Name:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              Ruth Annie
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Email:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              rukkiechowe@gmail.com
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Gender:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              Female
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Days Available:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              Mon, Tue, Wed, Thur, Fri
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Time Available:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              9am - 4pm
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography variant="h5">Bio:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod temporincididunt.
            </Typography>
          </Stack>
        </Grid>
      </Detail>
    </div>
  );
}
