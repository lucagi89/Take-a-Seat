'use client';
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import GenericFormField from "./GenericFormField";
import styles from "../../ui/loginform.module.css";

export default function ProfileForm(props: { email: string | null; password: string | null }) {
  const { signUp, loading } = useAuth();
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = props;

  // const [user, setUser] = useState({
  //   email: email || '',
  //   password: password || '',
  // });

  const [completeUser, setCompleteUser] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    postcode: "",
    city: "",
    country: "",
    favouriteCuisine: "",
    secondFavouriteCuisine: "",
    phone: "",
  });
  const cuisines = [
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Japanese",
    "Mediterranean",
    "Thai",
    "Greek",
    "French",
    "Spanish",
    "American",
    "Vietnamese",
    "Korean",
    "Turkish",
    "Lebanese",
    "Moroccan",
    "Peruvian",
    "Brazilian",
    "Argentinian",
    "Russian",
    "German",
    "British",
    "Polish",
    "Czech",
    "Hungarian",
    "Romanian",
    "Bulgarian",
    "Portuguese"
  ];

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
        if (email && password) {
          await signUp(email, password);
          if(!loading) {
            const user = auth.currentUser;
            if (user) {
            await setDoc(doc(db, "users", user.uid), {
              ...completeUser,
              email: user.email
            });
            console.log("Profile data saved successfully!");
          }
          }
        } else {
          console.error("Email or password not provided.");
        }
        console.log("Signup successful, redirecting...");
        router.push("/");
      } catch (error: unknown) {
        console.error("Error signing up:", error);
      }
  };

  return (
<form className={`${styles.form} max-w-md mx-auto`} onSubmit={handleProfileSubmit}>
<h1>Signup Page</h1>
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

  {/* Additional Fields */}
  {[
    { label: "First Name", key: "firstName", type: "text" },
    { label: "Last Name", key: "lastName", type: "text" },
    { label: "Street Address", key: "streetAddress", type: "text" },
    { label: "Postcode", key: "postcode", type: "text" },
    { label: "City", key: "city", type: "text" },
    { label: "Country", key: "country", type: "text" },
    { label: "Phone", key: "phone", type: "text" },
  ].map((field) => (
    <GenericFormField key={field.label} field={field} completeUser={completeUser} setCompleteUser={setCompleteUser} />
  ))}

  {/* Cuisine Select */}
  <div className="relative z-0 w-80 my-5 group">
    <select
      value={completeUser.favouriteCuisine}
      onChange={(e) => setCompleteUser({ ...completeUser, favouriteCuisine: e.target.value })}
      required
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white-600 peer"
    >
      <option value="" disabled>
        Select your favourite cuisine
      </option>
      {cuisines.map((cuisine) => (
        <option key={cuisine} value={cuisine}>
          {cuisine}
        </option>
      ))}
    </select>
    <label
      htmlFor="favouriteCuisine"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Favourite Cuisine
    </label>
  </div>

  <div className="relative z-0 w-80 my-5 group">
    <select
      value={completeUser.secondFavouriteCuisine}
      onChange={(e) =>
        setCompleteUser({ ...completeUser, secondFavouriteCuisine: e.target.value })
      }
      required
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white-600 peer"
    >
      <option value="" disabled>
        Select your second favourite cuisine
      </option>
      {cuisines
        .filter((cuisine) => cuisine !== completeUser.favouriteCuisine)
        .map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
    </select>
    <label
      htmlFor="secondFavouriteCuisine"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Second Favourite Cuisine
    </label>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="py-2.5 px-10 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  >
    Take a Seat
  </button>
</form>

  );
};
