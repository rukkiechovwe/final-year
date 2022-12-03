import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormDialog from "./dialog";

export default function BookSession({ openSessionModal, handleCloseSession }) {
  return (
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
          <MenuItem value="Sharon">Sharon</MenuItem>
          <MenuItem value="John">John</MenuItem>
          <MenuItem value="Ruth">Ruth</MenuItem>
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
  );
}
