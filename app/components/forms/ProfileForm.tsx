'use client';
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CompleteProfile(){
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

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
    const user = auth.currentUser;

    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          ...completeUser,
          email: user.email
        });
        console.log("Profile data saved successfully!");
        router.push("/");
      } catch (error) {
        console.error("Error saving profile data:", (error as Error).message);
      }
    } else {
      console.error("No user is signed in.");
    }
  };

  return (
    <form onSubmit={handleProfileSubmit}>
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
