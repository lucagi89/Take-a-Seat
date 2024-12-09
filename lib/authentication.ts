
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface UserData {
  email: string;
  password: string;
}

export async function createUser(data: UserData) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    console.log("User created: ", userCredential.user);
  }
  catch (error) {
    console.error("Error creating user: ", error);
  }
}

export async function signInUser(data: UserData) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    console.log("User signed in: ", userCredential.user);
  }
  catch (error) {
    console.error("Error signing in: ", error);
  }
}
