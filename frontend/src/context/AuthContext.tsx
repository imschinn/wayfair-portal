"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("wp_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const register = (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, error: "All fields are required." };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }
    const users: Record<string, { name: string; password: string }> = JSON.parse(
      localStorage.getItem("wp_users") || "{}"
    );
    if (users[email]) {
      return { success: false, error: "This email is already registered." };
    }
    users[email] = { name, password };
    localStorage.setItem("wp_users", JSON.stringify(users));
    // Do NOT auto-login after register — redirect to login instead
    return { success: true };
  };

  const login = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      return { success: false, error: "Please enter both email and password." };
    }
    const users: Record<string, { name: string; password: string }> = JSON.parse(
      localStorage.getItem("wp_users") || "{}"
    );
    const found = users[email];
    if (!found || found.password !== password) {
      return { success: false, error: "Invalid email or password." };
    }
    const loggedUser = { name: found.name, email };
    localStorage.setItem("wp_user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("wp_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
