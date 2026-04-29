import { useCallback, useState } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "auth";

const getSavedAuth = () => {
  try {
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    return savedAuth ? JSON.parse(savedAuth) : {};
  } catch {
    return {};
  }
};

export const AuthProvider = ({ children }) => {
  const savedAuth = getSavedAuth();
  const [currentUser, setCurrentUser] = useState(savedAuth.user || null);
  const [token, setToken] = useState(savedAuth.token || null);

  const saveSession = useCallback((user, authToken) => {
    setCurrentUser(user);
    setToken(authToken);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token: authToken }));
  }, []);

  const signup = useCallback(
    async (formData) => {
      try {
        const response = await axiosInstance.post("/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        const data = response.data;
        if (data.success) {
          saveSession(data.user, data.token);
          return { success: true, message: data.message };
        }
        return { success: false, message: data.message || "Signup failed" };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || error.message || "Signup failed",
        };
      }
    },
    [saveSession],
  );

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await axiosInstance.post("/auth/login", { email, password });
        const data = response.data;
        if (data.success) {
          saveSession(data.user, data.token);
          return { success: true, message: data.message };
        }
        return { success: false, message: data.message || "Login failed" };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || error.message || "Login failed",
        };
      }
    },
    [saveSession],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};