import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function FormDialog({
  children,
  formOpen,
  handleClose,
  title,
  desc,
  submitText,
}) {
  return (
    <div>
      <Dialog open={formOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">{title}</Typography>

          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {submitText && <Button type="submit">{submitText}</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
