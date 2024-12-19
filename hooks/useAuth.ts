import { useState, useEffect } from "react";
import { auth } from "../lib/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";

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
    let isMounted = true;

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (isMounted) {
      setUser(currentUser || null);
      setLoading(false);
    }
  });

    return () => {
      isMounted = false;
      unsubscribe();
      setUser(null); // Reset user on unmount or cleanup
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      const router = useRouter();
      router.push("/registration");
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    if (!email || !password) {
      throw new Error("Email and password must not be empty.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);

    } catch (error: any) {
      console.error("Error logging in:", error.code);
      if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email format.");
      } else if (error.code === "auth/user-not-found") {
        throw new Error("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password.");
      } else {
        throw new Error("An error occurred during login.");
      }
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
