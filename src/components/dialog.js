import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ children, formOpen, handleClose }) {
  return (
    <div>
      <Dialog open={formOpen} onClose={handleClose}>
        <DialogTitle>Book a session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form to book a session with a Counselor.
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Book Session</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
