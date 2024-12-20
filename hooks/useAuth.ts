import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase.config"; // Use the shared `auth` instance
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
      router.push("/registration"); // Redirect to registration page
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

    // Validate email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      setUser(userCredential.user);
      router.push("/");
    } catch (error: any) {
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);

      if (error.code === "auth/user-not-found") {
        signUp(email, password);
        router.push("/registration");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email format.");
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password.");
      } else if (error.code === "auth/invalid-credential") {
        signUp(email, password);
        router.push("/registration");
        throw new Error("Invalid credentials provided. Please check your Firebase configuration.");
      } else {
        throw new Error("An error occurred during login.");
      }
    }
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
  };
};
