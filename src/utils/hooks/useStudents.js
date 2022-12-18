import { useContext } from "react";
import { StudentsContext } from "../../context/stuentsContext";

const useStudents = () => {
  const context = useContext(StudentsContext);

  if (!context)
    throw new Error("Student users context must be use inside StudentProvider");
  return context;
};
export default useStudents;
