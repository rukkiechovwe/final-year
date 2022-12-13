// import { Suspense, lazy } from "react";
// import LoadingScreen from '../components/LoadingScreen';
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
// import AdminSessions from "../page/admin/sessions";
import AdminCounselors from "../page/admin/counselors";
import AdminStudents from "../page/admin/students";
import AdminCounselorDetails from "../page/admin/counselorDetails";
// import AdminSessionDetails from "../page/admin/sessionDetails";

// OTHERS
import useAuth from "../utils/hooks/useAuth";
import AdminContextProvider from "../context/adminContext";
import CounselorsContextProvider from "../context/counselorsContext";

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

  // if (!user?.role) {
  //   // return loading screen
  // } else {
  //   // switch statement
  // }

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
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <CounselorHome /> },
          { path: "sessions", element: <CounselorSessions /> },
          { path: "profile", element: <CounselorProfile /> },
          { path: "session-detail", element: <CounselorSessionDetails /> },
        ],
      });
      break;
    case 3:
      route.push({
        path: "/",
        element: (
          <AuthGuard>
            <CounselorsContextProvider>
              <DashboardLayout />
            </CounselorsContextProvider>
          </AuthGuard>
        ),
        children: [
          { path: "/", element: <StudentHome /> },
          { path: "sessions", element: <StudentSessions /> },
          { path: "profile", element: <StudentProfile /> },
          { path: "session-detail", element: <StudentSessionDetails /> },
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
