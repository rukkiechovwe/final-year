import Loadable from "../components/loadable";
import { useRoutes } from "react-router-dom";

// layouts
import AuthGuard from "./authGaurd";
import DashboardLayout from "../layout/dashboardLayout";
import AuthLayout from "../layout/authLayout";

// auth pages
import Login from "../page/auth/login";
import Register from "../page/auth/register";

// student pages
import StudentHome from "../page/students";
import StudentSessions from "../page/students/sessions";
import StudentProfile from "../page/students/profile";

import Home from "../page/home/index";

// counselor pages
import CounselorSessions from "../page/couselors/sessions";
import CounselorHome from "../page/couselors";
import CounselorProfile from "../page/couselors/profile";

// admin pages
import AdminHome from "../page/admin";
// import AdminSessions from "../page/admin/sessions";
import AdminCounselors from "../page/admin/counselors";
import AdminStudents from "../page/admin/students";
import AdminCounselorDetails from "../page/admin/counselorDetails";

// OTHERS
import useAuth from "../utils/hooks/useAuth";
import AdminContextProvider from "../context/adminContext";
import CounselorsContextProvider from "../context/counselorsContext";
import SessionContextProvider from "../context/sessionContext";
import SessionDetails from "../page/details/sessionDetails";

export default function Router() {
  const { user } = useAuth();
  const routes = getRouteBasedOnUserRole(user?.role);
  routes.push({
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  });

  return useRoutes(routes);
}

const getRouteBasedOnUserRole = (userRole) => {
  let route = [];

  switch (userRole) {
    case 1:
      route.push({
        path: "/",
        element: (
          <AuthGuard>
            <AdminContextProvider>
              <DashboardLayout />
            </AdminContextProvider>
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <AdminHome /> },
          // { path: "sessions", element: <AdminSessions /> },
          { path: "counselors", element: <AdminCounselors /> },
          { path: "students", element: <AdminStudents /> },
          { path: "counselor-detail/:id", element: <AdminCounselorDetails /> },
          // { path: "session-detail/:id", element: <AdminSessionDetails /> },
        ],
      });
      break;
    case 2:
      route.push({
        path: "/",
        element: (
          <AuthGuard>
            <SessionContextProvider>
              <DashboardLayout />
            </SessionContextProvider>
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <CounselorHome /> },
          { path: "sessions", element: <CounselorSessions /> },
          { path: "profile", element: <CounselorProfile /> },
          { path: "session-detail/:id", element: <SessionDetails /> },
        ],
      });
      break;
    case 3:
      route.push({
        path: "/",
        element: (
          <AuthGuard>
            <CounselorsContextProvider>
              <SessionContextProvider>
                <DashboardLayout />
              </SessionContextProvider>
            </CounselorsContextProvider>
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <StudentHome /> },
          { path: "sessions", element: <StudentSessions /> },
          { path: "profile", element: <StudentProfile /> },
          { path: "session-detail/:id", element: <SessionDetails /> },
        ],
      });
      break;

    default:
      route.push({
        path: "/",
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <Loadable /> },
          { path: "*", element: <Home /> },
        ],
      });
  }

  return route;
};
