//  if user is not signed in do not show the dashboard, redirect user to home page
// if user is signed in, check for the users role
// dispatch the role for general use



import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../../utils/hooks/useAuth";
// import LoadingScreen from "../../components/LoadingScreen";
// import GetStarted from "../../page/auth/Register/getStarted";

const AuthGuard = ({ children }) => {
  //   const { isAuthenticated, isInitialized, user, authToken } = useAuth();

  const { pathname } = useLocation();
  //   const linked = user?.chatBotLinkInfo?.isLinked ?? false;

  const [requestedLocation, setRequestedLocation] = useState("");

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} replace />;
  }

  //   if (!isInitialized) {
  //     return <LoadingScreen />;
  //   }

  //   if (!isAuthenticated && !authToken) {
  //     if (pathname !== requestedLocation) {
  //       setRequestedLocation(pathname);
  //     }
  //     return <Navigate to={"/login"} />;
  //   }

  //   if (linked === false && isAuthenticated && isInitialized) {
  //     if (pathname !== requestedLocation) {
  //       setRequestedLocation(pathname);
  //     }
  //     return <GetStarted />;
  //   }

  return <>{children}</>;
};

export default AuthGuard;
