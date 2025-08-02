import { createContext, useContext, useState, useEffect } from "react";
import { fetchJwtToken, fetchUserProfile, logoutUser } from "../api/userAPI";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkJwtToken = async () => {
    try {
      const res = await fetchJwtToken();

      return res.data.jwtToken === true;
    } catch (err) {
      console.error("checkJwtToken unexpected error:", err);
    }
  };

  const getUser = async () => {
    try {
      const jwtToken = await checkJwtToken();
      if (!jwtToken) return;

      const res = await fetchUserProfile();

      setUser(res.data.userInfo);
    } catch (err) {
      const status = err?.response?.status;

      if (status !== 401 && status !== 403) {
        console.error("getUser unexpected error:", err);
      }

      setUser(null);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutUser();

      if (res.status === 200) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
