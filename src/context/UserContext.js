import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getJwtToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/getJwtToken", {
        withCredentials: true,
      });

      return res.data.jwtToken === true;
    } catch (err) {
      console.error("getLoginStatus unexpected error:", err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const jwtToken = await getJwtToken();
      if (!jwtToken) return;

      const res = await axios.get("http://localhost:5000/user/profile", {
        withCredentials: true,
      });

      setUser(res.data.userInfo);
    } catch (err) {
      const status = err?.response?.status;

      if (status !== 401 && status !== 403) {
        console.error("fetchUserProfile unexpected error:", err);
      }

      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/logoutUser",
        {},
        { withCredentials: true }
      );

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
    <UserContext.Provider
      value={{ user, setUser, fetchUserProfile, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
