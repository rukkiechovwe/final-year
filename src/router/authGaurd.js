//  if user is not signed in do not show the dashboard, redirect user to login page.....doneee
// if user is signed in, check for the users role
// dispatch the role for general use

import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import Loader from "../components/loader";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized, authToken } = useAuth();

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState("");

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} replace />;
  }

  if (!isInitialized) {
    return <Loader />;
  }

  if (!isAuthenticated && !authToken) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={"/login"} />;
  }

//   if (isAuthenticated && authToken) {
//     if (pathname !== requestedLocation) {
//       setRequestedLocation(pathname);
//     }
//     return <Navigate to={"/"} />;
//   }

  return <>{children}</>;
};

export default AuthGuard;
