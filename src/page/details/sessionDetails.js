import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import Detail from "../../components/details";
import Dot from "../../components/common/dot";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function SessionDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async (id) => {
    const docRef = doc(db, "sessions", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setSession(docSnap.data());
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetchData(params.id);
    } else {
      navigate(`/sessions`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  return (
    <div>
      <Detail
        prevTitle="Session"
        prev="/sessions"
        activeTitle={`${params.id}`}
        active={`/session-details/${params.id}`}
      >
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Counselor Name:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {session.counselorId}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Student Name:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {session.studentId}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Session Type:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {session.sessionType}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Session Date:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {session.sessionDay} {session.sessionTime}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Status:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Dot
                      color={
                        session.sessionStatus === "upcoming"
                          ? "warning"
                          : "error"
                      }
                    />
                    <Typography>{session.sessionStatus}</Typography>
                  </Stack>
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Venue:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  Uniben Center
                </Typography>
              </Stack>
            </Grid>
          </>
        )}
      </Detail>
    </div>
  );
}
