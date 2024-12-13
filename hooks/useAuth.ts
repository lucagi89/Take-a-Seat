import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Define the interface for the authentication functions and state
interface UseAuth {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Define the custom hook
export const useAuth = (): UseAuth => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync the user state with Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  return {
    user,
    loading,
    signUp,
    login,
    logout,
  };
};
