'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase.config"; // Use the shared `auth` instance
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


// Define the interface for the authentication functions and state
interface UseAuth {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  handleFirebaseError: (error: any) => never;
}

// Define the custom hook
export const useAuth = (): UseAuth => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Move `useRouter` inside the hook

  useEffect(() => {
    // Listen for changes to the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
      setLoading(false); // Auth state is resolved
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Update the user state
      // router.push(`/signup?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`); // Redirect to registration page
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

    // Email and Password Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email format.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("Logged in user:", userCredential.user);
      setUser(userCredential.user);

      router.push("/"); // Redirect to home on success
    } catch (error: any) {
      handleFirebaseError(error.code);
    }
  };

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google user signed in:", result.user);
  } catch (error) {
    console.error("Error with Google sign-in:", error);
  }
}


  // Handle Firebase Errors
  const handleFirebaseError = (error: string): never => {
    const errorMessages: Record<string, string> = {
      "auth/user-not-found": "User not found. Please sign up.",
      "auth/invalid-email": "Invalid email format.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-credential": "User not found. Please sign up.",
    };
    throw new Error(errorMessages[error] || "An error occurred during login.");
  };


  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state
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
    handleFirebaseError
  };
};
