// import { Suspense, lazy } from "react";
// import LoadingScreen from '../components/LoadingScreen';
import { useRoutes } from "react-router-dom";

// layouts
import useAuth from "../utils/hooks/useAuth";
import AuthGuard from "./authGaurd";
import DashboardLayout from "../layout/dashboardLayout";
import AuthLayout from "../layout/authLayout";

// auth pages
import Login from "../page/auth/login";
import Register from "../page/auth/register";

// student pages
import StudentHome from "../page/students";
import StudentSessions from "../page/students/sessions";
import StudentSessionDetails from "../page/students/sessionDetails";
import StudentProfile from "../page/students/profile";

import Home from "../page/home/index";

// counselor pages
import CounselorSessions from "../page/couselors/sessions";
import CounselorHome from "../page/couselors";
import CounselorProfile from "../page/couselors/profile";
import CounselorSessionDetails from "../page/couselors/sessionDetails";

// admin pages
import AdminHome from "../page/admin";
import AdminSessions from "../page/admin/sessions";
import AdminCounselors from "../page/admin/counselors";
import AdminCounselorDetails from "../page/admin/counselorDetails";
import AdminSessionDetails from "../page/admin/sessionDetails";

// const Loadable = (props, {Component}) => {
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

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
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <AdminHome /> },
          { path: "sessions", element: <AdminSessions /> },
          { path: "counselor", element: <AdminCounselors /> },
          { path: "counselor-details", element: <AdminCounselorDetails /> },
          { path: "session-details", element: <AdminSessionDetails /> },
        ],
      });
      break;
    case 2:
      route.push({
        path: "/",
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <CounselorHome /> },
          { path: "sessions", element: <CounselorSessions /> },
          { path: "profile", element: <CounselorProfile /> },
          { path: "session-details", element: <CounselorSessionDetails /> },
        ],
      });
      break;
    case 3:
      route.push({
        path: "/",
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <StudentHome /> },
          { path: "sessions", element: <StudentSessions /> },
          { path: "profile", element: <StudentProfile /> },
          { path: "session-details", element: <StudentSessionDetails /> },
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
        children: [{ path: "/", element: <Home /> }],
      });
    // return 404 route
  }

  return route;
};
