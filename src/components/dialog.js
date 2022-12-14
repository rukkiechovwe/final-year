import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";

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
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "1.5rem",
              lineHeight: "1.33",
              fontFamily: "'Public Sans',sans-serif",
            }}
          >
            {title}
          </Typography>

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
