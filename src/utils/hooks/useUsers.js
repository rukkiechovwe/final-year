import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";

const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context)
    throw new Error("Admin users context must be use inside AdminProvider");
  return context;
};
export default useAdmin;
