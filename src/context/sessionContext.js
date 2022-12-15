import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import useAuth from "../utils/hooks/useAuth";

export const SessionContext = React.createContext();

function SessionContextProvider({ children }) {
  const { user } = useAuth();
  const [userSessions, setUserSessions] = useState([]);
  const [upcomingUserSessions, setUpcomingUserSessions] = useState([]);
  const [completedUserSessions, setCompletedUserSessions] = useState([]);

  const fetchSessions = async () => {
    console.log("<======= fetching sessions ========>");
    const sessionsData = [];
    let q;
    const sessionsRef = collection(db, "sessions");

    if (user.role === 3) {
      q = query(sessionsRef, where("studentId", "==", user.id));
    } else if (user.role === 2) {
      q = query(sessionsRef, where("counselorId", "==", user.id));
    } else {
      return;
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("session ==>", doc.data());
      sessionsData.push(doc.data());
    });
    setUserSessions(sessionsData);

    const upcomingData = sessionsData.filter(
      (session) => session.sessionStatus === "upcoming"
    );
    setUpcomingUserSessions(upcomingData);

    const completedData = sessionsData.filter(
      (session) => session.sessionStatus === "completed"
    );
    setCompletedUserSessions(completedData);
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SessionContext.Provider
      value={{
        userSessions,
        upcomingUserSessions,
        completedUserSessions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
