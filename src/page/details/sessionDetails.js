import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Detail from "../../components/details";
import Dot from "../../components/common/dot";
import CircularLoader from "../../components/circularLoader";
import useAuth from "../../utils/hooks/useAuth";
import { db } from "../../firebase";
export default function SessionDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [session, setSession] = useState({});
  const [student, setStudent] = useState({});
  const [counselor, setCounselor] = useState({});
  const [loading, setLoading] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingLinkErr, setMeetingLinkErr] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [approval, setApproval] = useState(false);
  const [errors, setErrors] = useState(false);
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
  const handleApproval = async (id, type) => {
    setErrors(false);
    if (type === "physical") {
      setApproval(true);
      const student = doc(db, "sessions", id);
      await updateDoc(student, { sessionStatus: "upcoming" });
    } else if (meetingLink && type === "online") {
      try {
        setApproval(true);
        const student = doc(db, "sessions", id);
        await updateDoc(student, {
          sessionLocation: meetingLink,
          sessionStatus: "upcoming",
        });
      } catch (err) {
        console.error(err);
        setErrors(true);
      } finally {
        setApproval(false);
      }
    } else {
      setMeetingLinkErr("Please provide a meeting link");
    }
  };
  const handleRejection = async (id) => {
    setErrors(false);
    try {
      setRejecting(true);
      const student = doc(db, "sessions", id);
      await updateDoc(student, { sessionStatus: "rejected" });
    } catch (err) {
      console.error(err);
      setErrors(true);
    } finally {
      setRejecting(false);
    }
  };
  const handleCompleted = async (id) => {
    setErrors(false);
    try {
      setCompleting(true);
      const student = doc(db, "sessions", id);
      await updateDoc(student, { sessionStatus: "completed" });
    } catch (err) {
      console.error(err);
      setErrors(true);
    } finally {
      setCompleting(false);
    }
  };
  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetchSessionDetail(params.id);
    } else {
      navigate(`/sessions`);
    }
  }, [params.id]);
  return (
    <div>
      {" "}
      <Detail
        prevTitle="Session"
        prev="/sessions"
        activeTitle={`${params.id}`}
        active={`/session-details/${params.id}`}
      >
        {" "}
        {loading ? (
          <CircularLoader />
        ) : (
          <>
            {" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Status:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {" "}
                    <Dot
                      color={
                        session.sessionStatus === "upcoming"
                          ? "primary"
                          : session.sessionStatus === "completed"
                          ? "success"
                          : session.sessionStatus === "rejected"
                          ? "error"
                          : "warning"
                      }
                    />{" "}
                    <Typography>{session.sessionStatus}</Typography>{" "}
                  </Stack>{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Counselor Name:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  {counselor.name}{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Student Name:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  {student.name}{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Session Type:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  {session.sessionType}{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Student Email:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  {student.email}{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Session Date:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  {session.sessionDay} {session.sessionTime}{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Student Department:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  {student.department}{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5" noWrap sx={{ minWidth: "125px" }}>
                  {" "}
                  Session Venue:{" "}
                </Typography>{" "}
                {session.sessionLocation ? (
                  <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                    {" "}
                    {session.sessionLocation}{" "}
                  </Typography>
                ) : session.sessionLocation === "" &&
                  session.sessionType === "online" &&
                  user.role === 2 ? (
                  <Stack width="100%">
                    {" "}
                    <OutlinedInput
                      fullWidth
                      placeholder="Enter meeting link"
                      name="meeting-link"
                      sx={{ height: "40px" }}
                      value={meetingLink}
                      onChange={(e) => {
                        setMeetingLink(e.target.value);
                      }}
                    />{" "}
                    <FormHelperText>
                      {" "}
                      Enter the meetling link you created{" "}
                    </FormHelperText>{" "}
                    {meetingLinkErr && (
                      <FormHelperText error>{meetingLinkErr}</FormHelperText>
                    )}{" "}
                  </Stack>
                ) : null}{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}>
              {" "}
              <Stack direction="row">
                {" "}
                <Typography variant="h5">Student Gender:</Typography>{" "}
                <Typography variant="h5" sx={{ ml: 2, fontWeight: 400 }}>
                  {" "}
                  {student.gender}{" "}
                </Typography>{" "}
              </Stack>{" "}
            </Grid>{" "}
            <Grid item xs={12} md={6}></Grid>{" "}
            {errors && (
              <Grid item xs={12} mb={-5}>
                {" "}
                <Typography color="error" textAlign="center">
                  {" "}
                  Something went wrong{" "}
                </Typography>{" "}
              </Grid>
            )}{" "}
            {user.role === 2 && session.sessionStatus === "pending" ? (
              <Grid item xs={12} md={6} mt={6}>
                {" "}
                <Button
                  disabled={approval || rejecting}
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => handleRejection(session.sessionId)}
                >
                  {" "}
                  Reject Session{" "}
                </Button>{" "}
              </Grid>
            ) : null}{" "}
            {user.role === 2 && session.sessionStatus === "pending" ? (
              <Grid item xs={12} md={6} mt={6}>
                {" "}
                <Button
                  disabled={approval || rejecting}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() =>
                    handleApproval(session.sessionId, session.sessionType)
                  }
                >
                  {" "}
                  Approve Session{" "}
                </Button>{" "}
              </Grid>
            ) : null}{" "}
            {user.role === 2 && session.sessionStatus === "upcoming" ? (
              <Grid item xs={12} mt={6}>
                {" "}
                <Button
                  disabled={completing}
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => handleCompleted(session.sessionId)}
                >
                  {" "}
                  Mark as Completed{" "}
                </Button>{" "}
              </Grid>
            ) : null}{" "}
          </>
        )}{" "}
      </Detail>{" "}
    </div>
  );
}
