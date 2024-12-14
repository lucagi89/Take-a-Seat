import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase.config";

type AdditionalUserData = {
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  address?: string;
  city?: string;
  country?: string;
  postCode?: string;

};

const signUpUser = async (email: string, password: string, additionalData: AdditionalUserData): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created:", user);

    // Step 2: Save additional data in Firestore
    const userDocRef = doc(db, "users", user.uid); // "users" is the Firestore collection name
    await setDoc(userDocRef, {
      name: additionalData.name,
      email: user.email,
      phoneNumber: additionalData.phoneNumber || null,
      role: additionalData.role || "user", // Default role
      createdAt: new Date().toISOString(),
    });

    console.log("User data saved in Firestore!");
  } catch (error) {
    console.error("Error during sign-up:", error);
  }
};

export default signUpUser;
