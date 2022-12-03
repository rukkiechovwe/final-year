import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import AccountPopover from "./accountPopover";
import BookSession from "../../components/bookSession";
import AddCounselor from "../../components/addCounselor";
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
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const [openCounselorModal, setOpenCounselorModal] = useState(false);

  const handleOpenSession = () => setOpenSessionModal(true);
  const handleOpenCounselor = () => setOpenCounselorModal(true);
  const handleCloseSession = () => setOpenSessionModal(false);
  const handleCloseCounselor = () => setOpenCounselorModal(false);

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
            onClick={handleOpenCounselor}
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Add a Counselor
          </Button>
          <Button
            onClick={handleOpenSession}
            variant="contained"
            startIcon={<AddOutlinedIcon />}
          >
            Book a Session
          </Button>
          <BookSession
            openSessionModal={openSessionModal}
            handleCloseSession={handleCloseSession}
          />
          <AddCounselor
            openCounselorModal={openCounselorModal}
            handleCloseCounselor={handleCloseCounselor}
          />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
