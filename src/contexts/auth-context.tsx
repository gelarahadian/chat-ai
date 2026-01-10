'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { tokenStore } from "../lib/tokenStore";

const AuthContext = createContext<{

  token: string | null;
  setToken: (t: string | null) => void;
}>({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    tokenStore.setToken(token);
  }, []);


  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
