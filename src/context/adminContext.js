import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const AdminContext = React.createContext();

function AdminContextProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [counselors, setCounselors] = useState([]);

  const fetchUsers = async () => {
    console.log("<======= fetching users ========>");
    const studentData = [];
    const counselorData = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.data().role === 3) {
        studentData.push(doc.data());
      } else if (doc.data().role === 2) {
        counselorData.push(doc.data());
      }
    });

    setStudents(studentData);
    setCounselors(counselorData);
  };

  useEffect(() => {
    // fetch users
    fetchUsers();
    // loop through the user data to separate counselors from students with their user roles
    // set counselors and students
  }, []);

  return (
    <AdminContext.Provider
      value={{
        students,
        counselors,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
export default AdminContextProvider;
