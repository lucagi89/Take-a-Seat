'use client';
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

export default function ProfileForm(props: { email: string | null; password: string | null }) {
  const { signUp, loading } = useAuth();
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = props;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

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
    // const user = auth.currentUser;

    if (user.email === email || user.password === password) {

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
      } catch (error: any) {
        console.error("Error signing up:", error);
      }
    } else if (user.email !== email) {
      console.error("Email do not match.");
    } else {
      console.error("Password do not match.");
    }
  }

  //   if (user) {
  //     try {
  //       await setDoc(doc(db, "users", user.uid), {
  //         ...completeUser,
  //         email: user.email
  //       });
  //       console.log("Profile data saved successfully!");
  //       router.push("/");
  //     } catch (error) {
  //       console.error("Error saving profile data:", (error as Error).message);
  //     }
  //   } else {
  //     console.error("No user is signed in.");
  //   }
  // };

  return (
    <form onSubmit={handleProfileSubmit}>
       {/* Email Input */}
       <div className="relative z-0 w-80 my-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-100 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-800 peer"
            placeholder=" "
            defaultValue={email || ''}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            autoComplete="email"
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-[calc(50%-40px)] peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm email address
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
            defaultValue={password || ''}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            autoComplete="current-password"
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-[calc(50%-40px)] top-3 -z-10 origin-[0] peer-focus:text-white-600 peer-focus:dark:text-white-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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

      <label>
        First Name:
        <input
          type="text"
          value={completeUser.firstName}
          onChange={(e) => setCompleteUser({ ...completeUser, firstName: e.target.value })}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={completeUser.lastName}
          onChange={(e) => setCompleteUser({ ...completeUser, lastName: e.target.value })}
          required
        />
      </label>
      <label>
        Street Address:
        <input
          type="text"
          value={completeUser.streetAddress}
          onChange={(e) => setCompleteUser({ ...completeUser, streetAddress: e.target.value })}
          required
        />
      </label>
      <label>
        Postcode:
        <input
          type="text"
          value={completeUser.postcode}
          onChange={(e) => setCompleteUser({ ...completeUser, postcode: e.target.value })}
          required
        />
      </label>
      <label>
        City:
        <input
          type="text"
          value={completeUser.city}
          onChange={(e) => setCompleteUser({ ...completeUser, city: e.target.value })}
          required
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          value={completeUser.country}
          onChange={(e) => setCompleteUser({ ...completeUser, country: e.target.value })}
          required
        />
      </label>

<label>
  Favourite Cuisine:
  <select
    value={completeUser.favouriteCuisine}
    onChange={(e) => setCompleteUser({ ...completeUser, favouriteCuisine: e.target.value })}
    required
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
</label>

<label>
  Second Favourite Cuisine:
  <select
    value={completeUser.secondFavouriteCuisine}
    onChange={(e) => setCompleteUser({ ...completeUser, secondFavouriteCuisine: e.target.value })}
    required
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
</label>

      <label>
        Phone:
        <input
          type="text"
          value={completeUser.phone}
          onChange={(e) => setCompleteUser({ ...completeUser, phone: e.target.value })}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
