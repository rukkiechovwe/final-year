import { useContext } from "react";
import { SessionContext } from "../../context/sessionContext";

const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) throw new Error("Session context must be use inside SessionProvider");
  return context;
};

export default useSession;
