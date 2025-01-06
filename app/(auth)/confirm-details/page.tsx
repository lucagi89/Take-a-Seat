"use client";
import { useState } from "react";
import styles from "../../ui/loginform.module.css";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const { signUp, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";
  const [showPassword, setShowPassword] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (email && password) {
        await signUp(email, password);
        if(!loading) {
          console.log("Signup successful, redirecting...");
          router.push("/complete-profile");
        }
      } else {
        console.error("Email or password not provided.");
      }
      console.log("Signup successful, redirecting...");
      router.push("/complete-profile");
    } catch (error: unknown) {
      console.error("Error signing up:", error);
    }
  };

  // console.log(email, password);

  return (
    <form
      className={`${styles.form} max-w-md mx-auto`}
      onSubmit={handleProfileSubmit}
    >
      <h1>Confirm your details</h1>
      {/* Email Input */}
      <div className="relative z-0 w-80 my-5 group">
        <input
          name="email"
          id="email"
          className="block py-2.5 px-100 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-800 peer"
          defaultValue={email || ""}
          readOnly
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm Email Address
        </label>
      </div>

      {/* Password Input */}
      <div className="relative z-0 w-80 mb-5 group">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white-600 peer"
          defaultValue={password || ""}
          readOnly
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-600 dark:text-gray-400"
        >
          {showPassword ? "🙈" : "👁"}
        </button>
      </div>
      <button
    type="submit"
    className="py-2.5 px-10 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  >
    Confirm Details
  </button>
    </form>
  );
}
