'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../lib/firebase.config';

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
        const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`, {
          method: 'GET',
        });

        if (!response.ok) {
          console.error('Error fetching user data:', await response.json());
          return null;
        }

        const userData = await response.json();
        console.log('User data:', userData);
        return userData;
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
