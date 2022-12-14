import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

import { db } from "../firebase";

/*
  + select a counselor
  + fetch the available time of that counselor
  + when a user selects that time, mark the time as unavailable...
  ...i.e remove it from the counselors list of available time
*/
export default function BookSession({ openSessionModal, handleCloseSession }) {
  const { counselors } = useCounselor();
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [counselorId, setCounselorId] = useState("");
  const [daysAvailable, setDaysAvailable] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState([]);

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
        day: Yup.string().required("session day is required"),
        type: Yup.string().required("session type is required"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, isSubmitting }
      ) => {
        console.log(values);
        setSubmitting(true);
        console.log(isSubmitting);

        // try {
        //   // add session to firestore
        //   const counselorData = {
        //     ...values,
        //     // date should be 22/12/22 not "Mon"
        //     sessionId: "session-id",
        //     counselorId: "counselor-id",
        //     studentId: "student-id",
        //     sessionStatus: "upcoming",
        //   };
        //   await setDoc(doc(db, "sessions", "sessionId"), counselorData);
        //   setStatus({ success: true });
        //   setErrors({});
        //   handleCloseSession();
        // } catch (error) {
        //   setStatus({ success: false });
        //   setErrors({ submit: error.message });
        // } finally {
        //   setSubmitting(false);
        // }
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
                <MenuItem value="online">Online</MenuItem>
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
                    <FormControl fullWidth sx={{ mt: "1rem" }}>
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
                    </FormControl>
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
              >
                Bookn Session
              </Button>
            </Grid>
          </form>
        </FormDialog>
      )}
    </Formik>
  );
}
