'use client';
import styles from "../../ui/loginform.module.css";
import googleSignIn from "../../../hooks/googleAuth";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app"; // Import FirebaseError type

export default function LoginForm() {
  const { login, handleFirebaseError } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  console.log(isLoading);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null; // Detect the button clicked
    const action = submitter?.value;
    setError(null);
    setIsLoading(true);

    // Validate email and password
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character."
      );
      setIsLoading(false);
      return;
    }

    try {
      if (action === "login") {
        await login(email, password);
        console.log("Login successful, redirecting...");
      } else if (action === "signup") {
        router.push(`/signup?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        console.log("Signing up...");
      }
    } catch (error) {
      handleFirebaseError(error); // Pass the error to the handler
    } finally {
      setIsLoading(false);
    }
  };

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

  // // Handle Firebase errors
  // const handleFirebaseError = (error: unknown) => {
  //   if (error instanceof FirebaseError) {
  //     console.error("Firebase error code:", error.code);
  //     console.error("Firebase error message:", error.message);

  //     if (error.code === "auth/user-not-found") {
  //       setError("User not found. Please sign up.");
  //     } else if (error.code === "auth/wrong-password") {
  //       setError("Incorrect email or password.");
  //     } else if (error.code === "auth/network-request-failed") {
  //       setError("Network error. Please try again later.");
  //     } else {
  //       setError("An unexpected error occurred.");
  //     }
  //   } else {
  //     console.error("Unknown error:", error);
  //     setError("An unexpected error occurred.");
  //   }
  // };

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

      {/* Google Sign-In Button */}
      <button
        type="button"
        className="text-gray bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
        onClick={async () => googleSignIn()}
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            fillRule="evenodd"
            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
            clipRule="evenodd"
          />
        </svg>
        Sign in with Google
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
