import React, { useEffect, useReducer } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export const UserContext = React.createContext();
const userId = localStorage.getItem("token");
const initialState = {
  authToken: userId ? userId : "",
  isAuthenticated: false,
  user: null,
  isInitialized: false,
  loading: false,
  error: "",
  email: "",
};
const handlers = {
  INITIALIZE: "INITIALIZE",
  USER: "USER",
  LOGOUT: "LOGOUT",
  AUTHORIZE: "AUTHORIZE",
  ERROR: "ERROR",
};
export const reducer = (state, action) => {
  const { user, authToken, isAuthenticated, error } = action.payload;
  switch (action.type) {
    case handlers.INITIALIZE:
      return { ...state, isAuthenticated, isInitialized: true, user };
    case handlers.USER:
      return { ...state, isAuthenticated: true, user, authToken };
    case handlers.LOGOUT:
      return { ...state, isAuthenticated: false, user: null, authToken: "" };
    case handlers.ERROR:
      return { ...state, error: error, isAuthenticated: false };
    default:
      return state;
  }
};
function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
      payload: {
        ...state,
        isAuthenticated: false,
        user: null,
        authToken: "",
        isInitialized: false,
      },
    });
  };
  const init = () => {
    dispatch({ type: "INITIALIZE", payload: { ...state, loading: true } });
  };
  const getUser = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    console.log("<======== fetching user data and role ========>");
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData !== null) {
        console.log(
          `==> [tracking events for user with id] :==> ${userData.id} <==`
        );
        console.log(userData);
        dispatch({
          type: "USER",
          payload: {
            ...state,
            authToken: id,
            isInitialized: true,
            isAuthenticated: true,
            user: userData,
          },
        });
        localStorage.setItem("userRole", userData.role);
        navigate("/");
      } else {
        logout();
      }
    } else {
      console.log("Could not find your details!");
    }
  };
  const isLoading = async (loading) => {
    dispatch({ type: "AUTHORIZE", payload: { ...state, loading: loading } });
  };
  useEffect(() => {
    if (userId) {
      init();
      getUser(userId);
    } else {
      console.log("no token found");
      dispatch({
        type: "INITIALIZE",
        payload: { ...state, isAuthenticated: false, user: null },
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ ...state, logout, isLoading, getUser }}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
