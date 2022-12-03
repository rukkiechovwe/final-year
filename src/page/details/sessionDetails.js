import { Avatar, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import Detail from "../../components/details";
import Dot from "../../components/common/dot";

export default function SessionDetails() {
  return (
    <div>
      <Detail
        prevTitle="Session"
        prev="/sessions"
        activeTitle="1712345ß"
        active="/session-details"
      >
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Counselor Name:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              Ruth Annie
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Student Name:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              Ruth Annie
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Session Type:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              Online/Physical
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Session Date:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              11/12/22
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Status:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Dot color="error" />
                <Typography>Rejected</Typography>
              </Stack>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row">
            <Typography variant="h5">Venue:</Typography>
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
              https://meet.google.com / Address
            </Typography>
          </Stack>
        </Grid>
      </Detail>
    </div>
  );
}
