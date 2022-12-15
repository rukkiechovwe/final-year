import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    role: [1, 2, 3],
    icon: <DashboardOutlinedIcon />,
  },
  {
    title: "sessions",
    path: "/sessions",
    role: [2, 3],
    icon: <HistoryOutlinedIcon />,
  },
  {
    title: "students",
    path: "/students",
    role: [1],
    icon: <GroupOutlinedIcon />,
  },
  {
    title: "counselors",
    path: "/counselors",
    role: [1],
    icon: <GroupOutlinedIcon />,
  },
  {
    title: "profile",
    path: "/profile",
    role: [2, 3],
    icon: <Person2OutlinedIcon />,
  },
];

export default navConfig;
