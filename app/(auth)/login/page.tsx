'use client';
import styles from "../../ui/loginform.module.css";
import googleSignIn  from "../../../hooks/googleAuth";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Start loading

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      setError("Please enter a valid email address.");
      setIsLoading(false); // Stop loading
      return;
    }

    // Password Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,}$)/; // More robust
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character."
      );
      setError(
        "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character."
      );
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      await login(email, password)
        console.log("Login successful, redirecting...");
    } catch (error: any) {
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);

      if (error.code === "auth/user-not-found") {
        router.push("/registration");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect email or password.");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  return (
    <div>
    <form className={`${styles.form} max-w-md mx-auto`} onSubmit={handleLogin}>
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
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-[calc(50%-40px)] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      <div className="relative z-0 w-80 mb-5 group">
          <input
            type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-[calc(50%-40px)] top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white-600 peer-focus:dark:text-white-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {/* Eye Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
            className="absolute right-2 top-2 text-gray-600 dark:text-gray-400"
          >
            {showPassword ? "🙈" : "👁"} {/* Replace with an icon library if preferred */}
          </button>
        </div>




      <button
        type="submit"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Take a Seat
      </button>
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
    </form>
     {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
  }
