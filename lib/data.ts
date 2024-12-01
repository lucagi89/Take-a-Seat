'use server';
import { db } from './firebase.config';
import { collection, getDocs, getDoc, DocumentData, DocumentSnapshot, doc } from 'firebase/firestore';
import { User } from './definitions';
import { z } from 'zod';

export default async function fetchRestaurants(): Promise<DocumentData[]> {

  const collectionRef = collection(db, 'restaurants');
  const snapshot = await getDocs(collectionRef);
  const restaurants = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return restaurants;
}



export async function getRestaurantData(id: string) {
  const docRef = doc(db, "restaurants", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }

  return docSnap.data();
}


// const UserFormSchema = z.object({
//   id: z.string(),
//   first_name: z.string(),
//   last_name: z.string(),
//   email: z.string(),
//   password: z.string(),
//   confirm_password: z.string(),
//   phone_number: z.string(),
//   address: z.string(),
// });

// const CreateUser = UserFormSchema.omit({id: true});


// export async function addUserData(formData: FormData) {
//   const data = CreateUser.parse(Object.fromEntries(formData.entries()));
//   console.log(data);
//   // const docRef = await addDoc(collection(db, "users"), data);
//   // console.log("Document written with ID: ", docRef.id);
//   return data;
// }
