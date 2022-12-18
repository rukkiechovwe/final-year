import { useContext } from "react";
import { CounselorsContext } from "../../context/counselorsContext";

const useCounselors = () => {
  const context = useContext(CounselorsContext);

  if (!context)
    throw new Error("Counselors context must be use inside CounselorProvider");
  return context;
};
export default useCounselors;
