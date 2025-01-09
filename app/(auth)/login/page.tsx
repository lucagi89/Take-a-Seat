'use client';
import styles from "../../ui/loginform.module.css";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { collection, getDoc, query, where, doc } from "firebase/firestore";
import { db, usersRef } from "../../../lib/firebase.config";

export default function LoginForm() {
  const { login, signInWithGoogle, user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  console.log(isLoading);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null; // Detect the button clicked
    const action = submitter?.value;
    setLoginError(null);
    setIsLoading(true);

    if (action === "google") {
      handleGoogleLogin();
    } else {
      if (action) {
        handleEmailAndPasswordLogin(action);
      } else {
        setLoginError("An unexpected error occurred. Please try again.");
        setIsLoading(false);
      }
    }
}

const handleEmailAndPasswordLogin = async (action: string) => {
  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,}$)/;
    return passwordRegex.test(password);
  };


  if (!validateEmail(email)) {
    setLoginError("Please enter a valid email address.");
    setIsLoading(false);
    return;
  } else if (!validatePassword(password)){
    setLoginError(
      "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character."
    );
    setIsLoading(false);
    return;
  } else {
    try{
      if (action === "login") {
      await login(email, password);
      console.log("Login successful, redirecting...");
    } else if (action === "signup") {
      router.push(`/confirm-details?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      console.log("Signing up...");
    }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("An unknown error occurred.");
      }
      setIsLoading(false);
    }

  }
  }

  const handleGoogleLogin = async () => {
      try {
        const userCredential = await signInWithGoogle(); // This should return user info
        const userId = userCredential.uid;
      // console.log("User info:", credential.uid);

      if (!userId) {
        throw new Error("Unable to retrieve user information.");
      }

      const isAlreadyUser = await checkUserExists(userId);
      if(isAlreadyUser) {
        router.push('/');
      } else{
        router.push(`/complete-profile?uid=${userId}`);
      }

      console.log("Google login successful, redirecting...");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("An unknown error occurred.");
      }
      setIsLoading(false);
    }
  };


  interface UserCredential {
    user: {
      uid: string;
    };
  }

  const checkUserExists = async (userId: string): Promise<boolean> => {
    try {
      const userRef = doc(usersRef, userId);
      const userDoc = await getDoc(userRef);
      return userDoc.exists();
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw error;
    }
  };




  return (
    <div>
      <form className={`${styles.form} max-w-md mx-auto`} onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="relative z-0 w-80 my-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-100 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-800 peer"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-[calc(50%-40px)] peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {/* Password Input */}
        <div className="relative z-0 w-80 mb-5 group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white-600 peer"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-[calc(50%-40px)] top-3 -z-10 origin-[0] peer-focus:text-white-600 peer-focus:dark:text-white-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-600 dark:text-gray-400"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            name="action"
            value="login"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Login
          </button>
          <button
            type="submit"
            name="action"
            value="signup"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Signup
          </button>
        </div>
      </form>

      <button
          type="button"
          value="google"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleGoogleLogin}
          >
          Sign in with Google
          </button>
      {/* Error Message */}
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </div>
  );
}
