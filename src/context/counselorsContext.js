import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const CounselorsContext = React.createContext();

function CounselorsContextProvider({ children }) {
  const [counselors, setCounselors] = useState([]);

  const fetchCounselors = async () => {
    console.log("<======= fetching counselors ========>");
    const counselorData = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.data().role === 2) {
        counselorData.push(doc.data());
      }
    });

    setCounselors(counselorData);
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  return (
    <CounselorsContext.Provider
      value={{
        counselors,
      }}
    >
      {children}
    </CounselorsContext.Provider>
  );
}
export default CounselorsContextProvider;
