import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("users")) || [];
    const hasAdmin = existing.some((u) => u.role === "admin");

    if (!hasAdmin) {
      const admin = {
        id: Date.now(),
        name: "Admin",
        email: "admin@gmail.com",
        password: "123",
        role: "admin",
      };
      localStorage.setItem("users", JSON.stringify([admin]));
      setUsers([admin]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const signup = (user) => {
    const exists = users.find((u) => u.email === user.email);

    if (exists) {
      return { success: false, message: "User already exists" };
    }

    setUsers((prev) => [...prev, user]);

    return { success: true, message: "Signup successful" };
  };

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      return { success: true };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
