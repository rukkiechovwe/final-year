import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import Detail from "../../components/details";
import Dot from "../../components/common/dot";
import CircularLoader from "../../components/circularLoader";
import { db } from "../../firebase";

export default function SessionDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState({});
  const [student, setStudent] = useState({});
  const [counselor, setCounselor] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStudentInfo = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("student data:", docSnap.data());
      setStudent(docSnap.data());
    } else {
      console.log("No such student!");
    }
  };

  const fetchCounselorInfo = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("counselor data:", docSnap.data());
      setCounselor(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such counselor!");
    }
  };

  const fetchSessionDetail = async (id) => {
    const docRef = doc(db, "sessions", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("session data:", docSnap.data());
      setSession(docSnap.data());
      fetchStudentInfo(docSnap.data().studentId);
      fetchCounselorInfo(docSnap.data().counselorId);
    } else {
      console.log("No such session!");
    }
  };

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetchSessionDetail(params.id);
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
          <CircularLoader />
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Student Name:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {student.name}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Counselor Name:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {counselor.name}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Student Email:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {student.email}
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
                <Typography variant="h5">Student Department:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {student.department}
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
                <Typography variant="h5">Student Gender:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {student.gender}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Session Venue:</Typography>
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  Uniben Center
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}></Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row">
                <Typography variant="h5">Session Status:</Typography>
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
          </>
        )}
      </Detail>
    </div>
  );
}
