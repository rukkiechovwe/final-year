import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const StudentsContext = React.createContext();

function StudentsContextProvider({ children }) {
  const [students, setStudents] = useState([]);

  const fetchStudentss = async () => {
    console.log("<======= fetching students ========>");

    const studentsData = [];
    const studentssRef = collection(db, "users");
    const q = query(studentssRef, where("role", "==", 3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      studentsData.push(doc.data());
    });

    setStudents(studentsData);
  };

  useEffect(() => {
    fetchStudentss();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        students,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}
export default StudentsContextProvider;
