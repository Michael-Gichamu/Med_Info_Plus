"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { isLogged } from "@/appwrite/auth.actions";
import { admins } from "@/config";
import { useRouter } from "next/navigation";
interface AuthContextType {
  isUserLoggedIn: boolean;
  isAdmin: boolean;
  checkLoggedIn: () => Promise<void>;
  userId: string;
}

const defaultAuthContext: AuthContextType = {
  isUserLoggedIn: false,
  isAdmin: false,
  checkLoggedIn: async () => {},
  userId: "",
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const checkLoggedIn = async () => {
    const logged: any = await isLogged();
    if (logged) {
      setIsLoggedIn(logged.status);

      setUserId(logged.$id);
      if (admins?.includes(logged.$id)) {
        setIsAdmin(true);
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, userId, isAdmin, checkLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
