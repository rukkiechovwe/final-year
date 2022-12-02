// import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
// import LoadingScreen from '../components/LoadingScreen';
import AuthLayout from "../layout/authLayout";

import Home from "../page/home/index";
import Login from "../page/auth/login";
import Register from "../page/auth/register";
import DashboardLayout from "../layout/dashboardLayout";
import Appointment from "../page/appointments";

// const Loadable = (props, {Component}) => {
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "sessions", element: <Appointment /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
}

// const Home = Loadable(lazy(() => import('../page/home/index')));
// const Login = Loadable(lazy(() => import('../page/auth/student/login')));
// const Register = Loadable(lazy(() => import('../page/auth/student/register')));
