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
  getAuth,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Define the interface for the authentication functions and state
interface UseAuth {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<User | null>;
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
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send email verification
    await sendEmailVerification(userCredential.user);
    console.log("Email verification sent. Please verify your email.");

    // Inform the user that they need to verify their email
    alert("A verification email has been sent. Please verify your email before logging in.");

    // Optional: Store user data in a "pending" state in Firestore or your database
    await saveUserToPendingDatabase(userCredential.user.uid, email);

  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

const saveUserToPendingDatabase = async (uid: string, email: string) => {
  const db = getFirestore();
  await setDoc(doc(db, "pendingUsers", uid), {
    email,
    verified: false,
  });
};


const checkEmailVerified = async (): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Refresh user data
    await user.reload();
    return user.emailVerified; // Returns true if verified
  }
  return false;
};


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

  const auth = getAuth();

  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if the email is verified
    await user.reload(); // Reload user data to ensure we have the latest info
    if (!user.emailVerified) {
      // If not verified, prompt the user and optionally resend the verification email
      alert("Please verify your email before logging in. A new verification email has been sent.");
      await sendEmailVerification(userCredential.user);
      throw new Error("Email not verified.");
    }

    console.log("Logged in user:", user);
    setUser(user); // Update the user state
    router.push("/"); // Redirect to home page on success
  } catch (error: any) {
    handleFirebaseError(error.code); // Handle Firebase-specific errors
  }
};

  const signInWithGoogle = async (): Promise<User | null> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setLoading(false);
      // Return the signed-in user
      return result.user;
    } catch (error) {
      console.error("Error with Google sign-in:", error);
      throw new Error(
        (error as { message?: string }).message || "An unknown error occurred."
      );
    }
  };



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
    signInWithGoogle,
    logout,
    handleFirebaseError
  };
};
