import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const CounselorsContext = React.createContext();

function CounselorsContextProvider({ children }) {
  const [counselors, setCounselors] = useState([]);

  const fetchCounselors = async () => {
    console.log("<======= fetching counselors ========>");
    const counselorData = [];
    const counselorsRef = collection(db, "users");
    const q = query(counselorsRef, where("role", "==", 2));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      counselorData.push(doc.data());
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
