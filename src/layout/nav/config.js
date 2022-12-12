import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    role: 0,
    icon: <DashboardIcon />,
  },
  {
    title: "sessions",
    path: "/sessions",
    role: 0,
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "counselor",
    path: "/counselor",
    role: 1,
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "profile",
    path: "/profile",
    role: 3, //role:2 and 3
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "details",
    path: "/counselor-details",
    role: 1,
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "session details",
    path: "/session-details",
    role: 0,
    icon: <CheckBoxOutlinedIcon />,
  },
];

export default navConfig;
