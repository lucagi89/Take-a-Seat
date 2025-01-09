'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../lib/firebase.config';
import { getUserData } from '../lib/data'

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userData: UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  // if (!loading){console.log('AuthProvider user:', user);}

  // console.log('AuthProvider user:', user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setUserData(null);
      return;
    }

    const fetchUserData = async (email: string) => {
      try {
        const data = await getUserData(email);
        if (typeof data === 'string' || data === null) {
          return null;
        }
        return data as UserData;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };

    const fetchAndSetUserData = async () => {
      setLoading(true);
      const data = await fetchUserData(user.email!);
      setUserData(data);
      setLoading(false);
    };

    fetchAndSetUserData();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
