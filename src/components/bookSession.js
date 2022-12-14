import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import { Formik } from "formik";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
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
import useCounselor from "../utils/hooks/useCounselor";
import useAuth from "../utils/hooks/useAuth";
import { db } from "../firebase";

export default function BookSession({ openSessionModal, handleCloseSession }) {
  const { user } = useAuth();
  const { counselors } = useCounselor();
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [counselorId, setCounselorId] = useState("");
  const [daysAvailable, setDaysAvailable] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState([]);
  const [value, setValue] = useState(dayjs());

  const fetchCounselor = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDaysAvailable(docSnap.data().availableDays);
      setTimeAvailable(docSnap.data().availableTime);
      setLoadingAvailability(false);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    setDaysAvailable([]);
    setTimeAvailable([]);
    setLoadingAvailability(true);
    fetchCounselor(counselorId);
  }, [counselorId]);

  return (
    <Formik
      initialValues={{
        time: "",
        day: "",
        type: "",
      }}
      validationSchema={Yup.object().shape({
        time: Yup.string().required("session time is required"),
        // day: Yup.string().required("session day is required"),
        type: Yup.string().required("session type is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log("test");
        console.log(values);

        setSubmitting(true);
        const counselorData = {
          sessionType: values.type,
          sessionTime: values.time,
          sessionDay: value.toString(),
          counselorId: counselorId,
          studentId: user.id,
          sessionStatus: "upcoming",
          sessionId: "",
        };
        const docRef = await addDoc(collection(db, "sessions"), counselorData);

        // update session with the session id
        const updateSession = doc(db, "sessions", docRef.id);
        await updateDoc(updateSession, {
          sessionId: docRef.id,
        });

        // remove the time from counselors list of available time
        let time = timeAvailable;
        let filteredTime = time.filter((e) => e !== values.time);
        const updateCounselor = doc(db, "users", counselorId);
        await updateDoc(updateCounselor, {
          availableTime: filteredTime,
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
                {counselors.map((item) => (
                  <MenuItem key={item.name} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                {/* <MenuItem value="online">Online</MenuItem> */}
                <MenuItem value="physical">Physical</MenuItem>
              </Select>
              {touched.type && errors.type && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-type-session"
                >
                  {errors.type}
                </FormHelperText>
              )}
            </FormControl>
            {!counselorId
              ? ""
              : loadingAvailability
              ? "loading..."
              : counselorId && (
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3} sx={{ mt: "1rem" }}>
                        <DatePicker
                          label="select a session day"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                    {/* <FormControl fullWidth sx={{ mt: "1rem" }}>
                      <InputLabel id="session-day">Session Day</InputLabel>
                      <Select
                        labelId="session-day"
                        id="day"
                        name="day"
                        label="select session day"
                        value={values.day}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.day && errors.day)}
                      >
                        {daysAvailable.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.day && errors.day && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-day-session"
                        >
                          {errors.day}
                        </FormHelperText>
                      )}
                    </FormControl> */}
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
                          id="standard-weight-helper-text-time-session"
                        >
                          {errors.time}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </>
                )}

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
