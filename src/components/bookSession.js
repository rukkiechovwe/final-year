import * as Yup from "yup";
import { Formik } from "formik";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormDialog from "./dialog";
import useCounselor from "../utils/hooks/useCounselor";

export default function BookSession({ openSessionModal, handleCloseSession }) {
  const { counselors } = useCounselor();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        gender: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {}}
    >
      <FormDialog
        formOpen={openSessionModal}
        handleClose={handleCloseSession}
        title="Book a session"
        desc="Fill the form to book a session with a Counselor."
        submitText="Book Session"
      >
        <FormControl fullWidth sx={{ mt: "1rem" }}>
          <InputLabel id="counselor">Select a counselor</InputLabel>
          <Select labelId="counselor" id="counselor" label="select a counselor">
            {counselors.map((item) => (
              <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
            ))}
            {/* <MenuItem value="John">John</MenuItem>
            <MenuItem value="Ruth">Ruth</MenuItem> */}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: "1rem" }}>
          <InputLabel id="type">Type</InputLabel>
          <Select labelId="type" id="type" label="type">
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Physical">Physical</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ mt: "1rem" }}
          id="type"
          label="Date"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          sx={{ mt: "1rem" }}
          id="Time"
          label="Time"
          type="text"
          fullWidth
          variant="outlined"
        />
      </FormDialog>
    </Formik>
  );
}
