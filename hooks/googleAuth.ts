import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth } from "../lib/firebase.config";

const googleSignIn = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();

  try {
    // Sign in with Google
    const result: UserCredential = await signInWithPopup(auth, provider);

    // Extract the authenticated user
    const user = result.user;
    console.log("User Info:", user);

    // Extract the Google credential and token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log("Google Access Token:", token);

    // Additional logic (e.g., save user info to the database)
  } catch (error: unknown) {
    // Firebase errors have the `code` and `message` properties
    if (error instanceof Error) {
      console.error("Error Code:", (error as any)?.code);
      console.error("Error Message:", error.message);
    } else {
      console.error("Unexpected error during Google Sign-In:", error);
    }
  }
};

export default googleSignIn;
