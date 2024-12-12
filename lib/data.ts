'use server';
import { create } from 'domain';
import { db } from './firebase.config';
import { collection, getDocs, getDoc, DocumentData, DocumentSnapshot, doc, addDoc } from 'firebase/firestore';
// import { User } from './definitions';

export default async function fetchRestaurants(): Promise<DocumentData[]> {

  const collectionRef = collection(db, 'restaurants');
  const snapshot = await getDocs(collectionRef);
  const restaurants = snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    city: doc.data().city,
    address: doc.data().address,
    postcode: doc.data().postcode,
    latitude: doc.data().latitude,
    longitude: doc.data().longitude,
    phone: doc.data().phone,
    email: doc.data().email,
    isAvailable: doc.data().isAvailable,
  }));
  console.log(restaurants);
  return restaurants;
}

// fetchRestaurants();



export async function getRestaurantData(id: string): Promise<DocumentData> {
  const docRef = doc(db, "restaurants", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }

  return docSnap.data();
}


// export async function createUser(data: User) {
//   const userRef = collection(db, 'users');

//   const newUser = {
//     first_name: data.first_name,
//     last_name: data.last_name,s
//     email: data.email,
//     is_host: false,
//     password: data.password,
//     phone: data.phone,
//     address: data.address
//   }

//   try{
//     await addDoc(userRef, newUser).then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//     });
//   }
//   catch (error) {
//     console.error("Error adding document: ", error);
//   }




// }
