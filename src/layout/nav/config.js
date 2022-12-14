import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    role: [1, 2, 3],
    icon: <DashboardIcon />,
  },
  {
    title: "sessions",
    path: "/sessions",
    role: [2, 3],
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "students",
    path: "/students",
    role: [1],
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "counselors",
    path: "/counselors",
    role: [1],
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    title: "profile",
    path: "/profile",
    role: [2, 3],
    icon: <CheckBoxOutlinedIcon />,
  },
  // {
  //   title: "counselor-detail",
  //   path: "/counselor-detail",
  //   role: [1],
  //   icon: <CheckBoxOutlinedIcon />,
  // },
  {
    title: "session detail",
    path: "/session-detail",
    role: [ 2, 3],
    icon: <CheckBoxOutlinedIcon />,
  },
];

export default navConfig;
