import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AccountPopover from "./accountPopover";
import { useState } from "react";
import FormDialog from "../../components/dialog";
// import NotificationsPopover from "./NotificationsPopover";

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
  borderBottom: "1px dashed rgb(217 217 217)",
  backgroundColor: "transparent",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
  background: "#fff",
}));

export default function Header({ onOpenNav }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <NotificationsPopover /> */}
          <Button
            onClick={handleOpen}
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Book a Session
          </Button>
          <FormDialog formOpen={openModal} handleClose={handleClose}>
            <FormControl fullWidth sx={{ mt: "1rem" }}>
              <InputLabel id="counselor">Select a counselor</InputLabel>
              <Select
                labelId="counselor"
                id="counselor"
                label="select a counselor"
              >
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
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
