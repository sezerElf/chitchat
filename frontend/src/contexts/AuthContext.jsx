import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import axiosService from "../services/axiosService";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tryAuthenticate = async () => {
      try {
        const { accessToken, user } = (await axios.post("/api/auth/refresh"))
          .data;

        setAuthenticatedUser(user);
        axiosService.defaults.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    tryAuthenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
