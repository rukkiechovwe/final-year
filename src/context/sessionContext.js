import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const SessionContext = React.createContext();

function SessionContextProvider({ children }) {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    console.log("<======= fetching sessions ========>");
    // fetch sessions
  };

  useEffect(() => {
    // fetchSessions();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
export default SessionContextProvider;
