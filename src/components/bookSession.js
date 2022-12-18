import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  FormHelperText,
} from "@mui/material";
import FormDialog from "./dialog";
import useCounselors from "../utils/hooks/useCounselors";
import useAuth from "../utils/hooks/useAuth";
import { db } from "../firebase";
import CircularLoader from "../components/circularLoader";

export default function BookSession({ openSessionModal, handleCloseSession }) {
  const { user } = useAuth();
  const { counselors } = useCounselors();
  const [isCounselorLoading, setIsCounselorLoading] = useState(false);
  const [isTimeLoading, setIsTimeLoading] = useState(false);
  const [counselorId, setCounselorId] = useState("");
  const [daysAvailable, setDaysAvailable] = useState([]);
  const [daysAvailableText, setDaysAvailableText] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState([]);
  const [datevalue, setDateValue] = useState("");
  const [dateErr, setDateErr] = useState("");

  const fetchCounselor = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let daysNum = [];
      docSnap.data().availableDays.forEach((day) => {
        switch (day) {
          case "Mon":
            daysNum.push(1);
            break;
          case "Tue":
            daysNum.push(2);
            break;
          case "Wed":
            daysNum.push(3);
            break;
          case "Thurs":
            daysNum.push(4);
            break;
          case "Fri":
            daysNum.push(5);
            break;

          default:
            break;
        }
      });
      setDaysAvailable(daysNum);
      setDaysAvailableText(docSnap.data().availableDays);
      setTimeAvailable(docSnap.data().availableTime);
      setIsCounselorLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  const fetchTimeSlot = async (counselorId, value) => {
    const sessionsRef = collection(db, "sessions");
    const q = query(
      sessionsRef,
      where("counselorId", "==", counselorId),
      where("sessionDay", "==", dayjs(value.toString()).format("DD/MM/YYYY"))
    );

    const takenTimeSlot = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      takenTimeSlot.push(doc.data().sessionTime);
    });

    const timeSlotLeft = timeAvailable.filter(
      (e) => !takenTimeSlot.includes(e)
    );
    setTimeAvailable(timeSlotLeft);
    setIsTimeLoading(false);
  };

  useEffect(() => {
    if (counselorId) {
      setTimeAvailable([]);
      setDateValue("");
      setIsCounselorLoading(true);
      fetchCounselor(counselorId);
    }
  }, [counselorId]);

  useEffect(() => {
    if (datevalue && !Boolean(dateErr)) {
      setIsTimeLoading(true);
      fetchTimeSlot(counselorId, datevalue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datevalue, dateErr]);

  const handleDate = (value) => {
    setDateErr("");
    let d = new Date(dayjs(value.toString())).getDay();
    if (d === 0 || d === 6 || !daysAvailable.includes(d)) {
      setDateErr("The counselor is not available on this selected day");
    }
    setDateValue(value);
  };

  return (
    <Formik
      initialValues={{
        time: "",
        type: "",
      }}
      validationSchema={Yup.object().shape({
        time: Yup.string().required("session time is required"),
        type: Yup.string().required("session type is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setSubmitting(true);
        let counselorData = {
          sessionType: values.type,
          sessionTime: values.time,
          sessionDay: dayjs(datevalue.toString()).format("DD/MM/YYYY"),
          counselorId: counselorId,
          studentId: user.id,
          sessionStatus: "upcoming",
          sessionId: "",
          sessionLocation: "",
        };
        if (values.type === "online") {
          // get google meet link
          counselorData = {
            ...counselorData,
            sessionLocation: "",
          };
        } else {
          counselorData = {
            ...counselorData,
            sessionLocation: "Uniben Center",
          };
        }
        const docRef = await addDoc(collection(db, "sessions"), counselorData);

        // update session with the session id
        const updateSession = doc(db, "sessions", docRef.id);
        await updateDoc(updateSession, {
          sessionId: docRef.id,
        });

        setStatus({ success: true });
        setErrors({});
        handleCloseSession();
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <FormDialog
          formOpen={openSessionModal}
          handleClose={handleCloseSession}
          title="Book a session"
          desc="Fill the form to book a session with a Counselor."
        >
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mt: "1rem" }}>
              <InputLabel id="counselor">Select a counselor</InputLabel>
              <Select
                labelId="counselor"
                id="counselor"
                label="select a counselor"
                onChange={(e) => {
                  setCounselorId(e.target.value);
                }}
              >
                {counselors.length > 0 &&
                  counselors.map((item) => (
                    <MenuItem key={item.name} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {!counselorId ? (
              ""
            ) : isCounselorLoading ? (
              <CircularLoader />
            ) : (
              counselorId && (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3} sx={{ mt: "1rem" }}>
                      <DatePicker
                        label="select a session day"
                        value={datevalue}
                        onChange={(newValue) => handleDate(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} error={Boolean(dateErr)} />
                        )}
                        disablePast
                      />
                      <FormHelperText sx={{ m: "0 !important", mt: "15px" }}>
                        Days available:{" "}
                        {daysAvailableText.length > 0
                          ? daysAvailableText.join(" ,")
                          : "counselor is not available"}
                      </FormHelperText>

                      {dateErr && (
                        <FormHelperText
                          error
                          sx={{ m: "0 !important", mt: "10px" }}
                        >
                          {dateErr}
                        </FormHelperText>
                      )}
                    </Stack>
                  </LocalizationProvider>
                </>
              )
            )}

            {!datevalue ? (
              ""
            ) : isTimeLoading ? (
              <CircularLoader />
            ) : (
              !Boolean(dateErr) && (
                <FormControl fullWidth sx={{ mt: "1rem" }}>
                  <InputLabel id="session-time">Session Time</InputLabel>
                  <Select
                    labelId="session-time"
                    id="time"
                    name="time"
                    label="select session time"
                    value={values.time}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.time && errors.time)}
                  >
                    {timeAvailable.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.time && errors.time && (
                    <FormHelperText
                      error
                      sx={{ m: "0 !important", mt: "10px" }}
                    >
                      {errors.time}
                    </FormHelperText>
                  )}
                </FormControl>
              )
            )}

            <FormControl fullWidth sx={{ mt: "1rem" }}>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                name="type"
                label="type"
                value={values.type}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.type && errors.type)}
              >
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="physical">Physical</MenuItem>
              </Select>
              {touched.type && errors.type && (
                <FormHelperText error sx={{ m: "0 !important", mt: "10px" }}>
                  {errors.type}
                </FormHelperText>
              )}
            </FormControl>

            <Grid item xs={12} mt={3}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Book Session
              </Button>
            </Grid>
          </form>
        </FormDialog>
      )}
    </Formik>
  );
}
