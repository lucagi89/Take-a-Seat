import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

export default async function googleSignIn(){
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google sign-in successful:", user);
    router.push("/");
  } catch (error: any) {
    console.error("Error during Google sign-in:", error.message);
  }
};
