import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import useAuth from "../utils/hooks/useAuth";

export const SessionContext = React.createContext();

function SessionContextProvider({ children }) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [userSessions, setUserSession] = useState([]);

  const fetchSessions = async () => {
    console.log("<======= fetching sessions ========>");
    // fetch sessions
    const sessionsData = [];
    const querySnapshot = await getDocs(collection(db, "sessions"));
    querySnapshot.forEach((doc) => {
      console.log("session ==>", doc.data());
      sessionsData.push(doc.data());
    });
    setSessions(sessionsData);

    // filter session by user id
    let filteredUserSessions = [];
    console.log(user.role);
    if (user.role === 3) {
      filteredUserSessions = sessionsData.filter(
        (session) => session.studentId === user.id
      );
    } else if (user.role === 2) {
      filteredUserSessions = sessionsData.filter(
        (session) => session.counselorId === user.id
      );
    } else {
      return;
    }
    console.log(filteredUserSessions);
    setUserSession(filteredUserSessions);

    // filter upcomin sessions and completed sessions
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SessionContext.Provider
      value={{
        sessions,
        userSessions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
